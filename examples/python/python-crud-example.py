from pipium_connect import (
    connect,
    ConnectOptions,
    FormWidgetConfig,
    Input,
    Model,
    Types,
    WidgetConfig,
)
import json
import os
from dotenv import load_dotenv

load_dotenv()
pipium_api_key = os.getenv("PIPIUM_API_KEY")

state = {}
id_counter = 0


def run(input: Input):
    global state
    global id_counter

    command = json.loads(input.text)

    if command["action"] == "add":
        id = str(id_counter)
        state[id] = command
        id_counter += 1

    if command["action"] == "delete" and command["id"] in state:
        del state[command["id"]]

    return json.dumps(state)


connect(
    pipium_api_key,
    {
        "crud": Model(
            run_sync=lambda input: run(input),
            name="CRUD",
            widget_config=WidgetConfig(
                form=FormWidgetConfig(
                    schema={
                        "type": "object",
                        "properties": {
                            "action": {
                                "title": "Action",
                                "type": "string",
                                "enum": ["add", "delete"],
                            },
                        },
                        "allOf": [
                            {
                                "if": {
                                    "type": "object",
                                    "properties": {"action": {"const": "add"}},
                                    "required": ["action"],
                                },
                                "then": {
                                    "type": "object",
                                    "properties": {
                                        "title": {"type": "string", "title": "Title"},
                                        "content": {
                                            "type": "string",
                                            "title": "Content",
                                        },
                                    },
                                    "required": ["title"],
                                },
                            },
                            {
                                "if": {
                                    "type": "object",
                                    "properties": {"action": {"const": "delete"}},
                                    "required": ["action"],
                                },
                                "then": {
                                    "type": "object",
                                    "properties": {
                                        "id": {"type": "string", "title": "ID"},
                                    },
                                    "required": ["id"],
                                },
                            },
                        ],
                    },
                ),
            ),
            types=Types(
                inputs=["application/json"],
                output="application/json",
            ),
        )
    },
)
