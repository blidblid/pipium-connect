import {
  ConnectionBody,
  ConnectionCompleteBody,
  ConnectionErrorBody,
  ConnectionInput,
  ConnectionPreviousValue,
  ConnectionResultBody,
  ConnectionStartBody,
} from '@pipium/model';
import { ConnectAdapter, ConnectSocket } from './connect-model';
import { is_promise, omit_object_properties } from './connect-util';
import { Connection, RunInput, RunPreviousValue, RunValue } from './run-model';

export async function connect(
  adapter: ConnectAdapter,
  socket: ConnectSocket,
  connections: Record<string, Connection>,
) {
  socket.on('pp-connect', () => {
    const payload: ConnectionBody = {
      source: adapter.source,
      models: Object.entries(connections).map(([id, connection]) => {
        return {
          id,
          ...omit_object_properties(connection, ['run_sync', 'run_async']),
        };
      }),
    };

    socket.emit('pp-init', payload);
  });

  socket.on('pp-run', async (connection_input: ConnectionInput) => {
    const input: RunInput = {
      ...connection_input,
      text: try_string_decode(connection_input.binary),
      previous_values: connection_input.previous_values.map(
        connection_previous_value_to_run_previous_value,
      ),
    };

    const model = connections[input.connection_model_id];
    const run_async = model.run_async;
    const run_sync = model.run_sync;

    const emit_start = () => {
      const start: ConnectionStartBody = {
        id: input.id,
        user_id: input.user_id,
        pipe_id: input.pipe_id,
        model_id: input.model_id,
        layer_id: input.layer_id,
        result_id: input.result_id,
      };

      adapter.log('Emitting start');
      socket.emit('pp-start', start);
    };

    const emit_result = (value: RunValue) => {
      const payload: ConnectionResultBody = {
        value,
        id: input.id,
        user_id: input.user_id,
        pipe_id: input.pipe_id,
        layer_id: input.layer_id,
        model_id: input.model_id,
        result_id: input.result_id,
        mime_type: model.types.output,
      };

      adapter.log('Emitting result');
      socket.emit('pp-result', payload);
    };

    const emit_error = (message: string) => {
      const payload: ConnectionErrorBody = {
        id: input.id,
        user_id: input.user_id,
        pipe_id: input.pipe_id,
        layer_id: input.layer_id,
        model_id: input.model_id,
        result_id: input.result_id,
        message: create_error_message(message),
      };

      adapter.log('Emitting error');
      socket.emit('pp-error', payload);
    };

    const emit_complete = () => {
      const payload: ConnectionCompleteBody = {
        id: input.id,
        user_id: input.user_id,
        pipe_id: input.pipe_id,
        layer_id: input.layer_id,
        model_id: input.model_id,
        result_id: input.result_id,
      };

      adapter.log('Emitting complete');
      socket.emit('pp-complete', payload);
    };

    if (!model) {
      adapter.log(`Model ${input.model_id} not found`);
      emit_complete();
      return;
    }

    const create_error_message = (message: string) => {
      return `The model threw an error "${message}"`;
    };

    const on_error = (error: unknown) => {
      const native_error_message =
        error instanceof Error ? error.message : 'Unknown error';
      const error_message = create_error_message(native_error_message);
      adapter.log(error_message);
      console.error(error_message);
      emit_error(native_error_message);
    };

    if (!run_sync && !run_async) {
      adapter.log('No run function found');
      emit_complete();
      return;
    }

    emit_start();

    if (run_sync) {
      adapter.log('Starting sync run');

      try {
        const result = run_sync(input);
        const output = is_promise(result) ? await result : result;
        const values = Array.isArray(output) ? output : [output];

        for (const value of values) {
          emit_result(value);
        }

        emit_complete();
      } catch (error: unknown) {
        on_error(error);
        return;
      }
    }

    if (run_async) {
      adapter.log('Starting async run');

      try {
        await new Promise<void>((resolve) => {
          run_async(input, {
            next: emit_result,
            error: (error) => {
              emit_error(error);
              resolve();
            },
            complete: () => {
              emit_complete();
              resolve();
            },
          });
        });
      } catch (error: unknown) {
        on_error(error);
        return;
      }
    }
  });

  socket.on('pp-log', (message: string) => {
    adapter.log(message);
  });

  socket.on('pp-log-error', (message: string) => {
    adapter.log(message);
  });

  socket.on('exception', (error: unknown) => {
    adapter.log('Exception');

    try {
      console.error(JSON.stringify(error, null, 2));
    } catch {
      console.error(error);
    }
  });
}

function try_string_decode(value: Uint8Array | ArrayBuffer) {
  try {
    return new TextDecoder().decode(value);
  } catch {
    return '';
  }
}

function connection_previous_value_to_run_previous_value(
  previous_value: ConnectionPreviousValue,
): RunPreviousValue {
  return {
    ...previous_value,
    binary: async () => {
      const response = await fetch(previous_value.uri);
      return response.arrayBuffer();
    },
    text: async () => {
      const response = await fetch(previous_value.uri);
      return response.text();
    },
  };
}
