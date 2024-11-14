import os
import base64
import requests
from pipium_connect import connect
from dotenv import load_dotenv

load_dotenv()

google_api_key = os.getenv("GOOGLE_API_KEY")
pipium_api_key = os.getenv("PIPIUM_API_KEY")


def google_translate(input):
    endpoint = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "q": input["text"],
        "format": "text",
        "target": input["config"]["target"],
        "key": google_api_key,
    }

    response = requests.get(endpoint, params=params)
    json_data = response.json()

    if "error" in json_data:
        raise ValueError(json_data["error"]["message"])

    return json_data["data"]["translations"][0]["translatedText"]


def google_speech_to_text(input):
    endpoint = "https://speech.googleapis.com/v1/speech:recognize"
    params = {"key": google_api_key}
    body = {
        "audio": {
            "content": base64.b64encode(input["binary"]).decode("utf-8"),
        },
        "config": {
            "language_code": input["config"]["language_code"],
        },
    }

    response = requests.post(endpoint, params=params, json=body)
    json_data = response.json()

    if "error" in json_data:
        raise ValueError(json_data["error"]["message"])

    if "results" not in json_data or len(json_data["results"]) == 0:
        return "Inaudible or no speech detected."

    # Concatenate transcripts
    return ", ".join(
        result["alternatives"][0]["transcript"] for result in json_data["results"]
    )


connect(
    os.environ["PIPIUM_API_KEY"],
    {
        "google_translate": {
            "name": "Google Translate",
            "run_sync": google_translate,
            "types": {
                "inputs": ["text/plain"],
                "output": "text/plain",
            },
            "schema": {
                "type": "object",
                "properties": {
                    "target": {
                        "title": "Target",
                        "type": "string",
                        "enum": ["de", "en", "es", "sv", "zh"],
                        "default": "en",
                    },
                },
                "required": ["target"],
            },
        },
        "google_speech_to_text": {
            "name": "Google Speech to Text",
            "run_sync": google_speech_to_text,
            "types": {
                "inputs": ["audio/wav", "audio/webm"],
                "output": "text/plain",
            },
            "schema": {
                "type": "object",
                "properties": {
                    "language_code": {
                        "title": "Language",
                        "type": "string",
                        "enum": ["de", "en", "es", "sv", "zh"],
                        "default": "en",
                    },
                },
                "required": ["language_code"],
            },
        },
    },
    {"server_url": "http://localhost:3000"},
)
