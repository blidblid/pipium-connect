import { z } from 'zod';
import { FOLDER_ID_SCHEMA, PIPE_ID_SCHEMA } from './common-model';

export const FILE_BODY_SCHEMA = z.object({
  name: z.string().optional(),
  folderId: FOLDER_ID_SCHEMA.optional(),
  pipeId: PIPE_ID_SCHEMA.optional(),
});

export const FILE_SCHEMA = FILE_BODY_SCHEMA.extend({
  id: z.string(),
});

export type FileBody = z.infer<typeof FILE_BODY_SCHEMA>;
export type File = z.infer<typeof FILE_SCHEMA>;
