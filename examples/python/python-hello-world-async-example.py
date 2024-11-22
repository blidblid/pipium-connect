import os
import asyncio
from pipium_connect import connect, ConnectOptions, Model, Input, Observer, Types
from dotenv import load_dotenv

load_dotenv()

pipium_api_key = os.getenv("PIPIUM_API_KEY")


async def say_hello(input: Input, observer: Observer):
    observer.next(f"Hello {input.text}")
    observer.complete()


connect(
    pipium_api_key,
    {
        "hello_world": Model(
            run_async=lambda input, observer: asyncio.run(say_hello(input, observer)),
            name="Hello, World!",
            types=Types(
                inputs=["text/plain"],
                output="text/plain",
            ),
        ),
    },
)
