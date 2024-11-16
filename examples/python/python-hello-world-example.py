import os
from pipium_connect import connect
from dotenv import load_dotenv

load_dotenv()

pipium_api_key = os.getenv("PIPIUM_API_KEY")

connect(
    pipium_api_key,
    {
        "hello_world": {
            "run_sync": lambda input: f"Hello {input['text']}",
            "name": "Hello, World!",
            "types": {
                "inputs": ["text/plain"],
                "output": "text/plain",
            },
        },
    },
)
