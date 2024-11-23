import os
from pipium_connect import connect, Model, Types
from dotenv import load_dotenv

load_dotenv()

pipium_api_key = os.getenv("PIPIUM_API_KEY")

connect(
    pipium_api_key,
    {
        "hello_world": Model(
            run_sync=lambda input: f"Hello {input.text}",
            name="Hello, World!",
            types=Types(
                inputs=["text/plain"],
                output="text/plain",
            ),
        ),
    },
)
