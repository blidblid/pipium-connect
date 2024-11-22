from typing import Union


# The output value types of a run. Pipium will use the output MIME type to infer the type of any binary date.
Output = Union[bytes, memoryview, str]
