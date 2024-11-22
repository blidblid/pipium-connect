from datetime import datetime
from typing import Callable


class PreviousValue:
    """A previous value for the current run."""

    uri: str
    """URI of the previous value to download it."""

    description: str
    """Description of the previous value."""

    date: datetime
    """Date of the previous value."""

    binary: Callable[[bytes], None]
    """Function to download the previous value as binary."""

    json: Callable[[str], None]
    """Function to download the previous value as JSON."""

    text: Callable[[str], None]
    """Function to download the previous value as text."""

    def __init__(
        self,
        uri: str,
        description: str,
        date: datetime,
        binary: Callable[[bytes], None],
        json: Callable[[str], None],
        text: Callable[[str], None],
    ):
        """Initialize a PreviousValue object.

        Args:
            uri: URI of the previous value.
            description: Description of the previous value.
            date: Date of the previous value.
            binary: Function to download the previous value as binary.
            json: Function to download the previous value as JSON.
            text: Function to download the previous value as text."""

        self.uri = uri
        self.description = description
        self.date = date
        self.binary = binary
        self.json = json
        self.text = text
