from pydantic import BaseModel

from .channel import Channel
from .program import Program


class User(BaseModel):
    id: int
    email: str
    hashed_password: str
    fingerprint: str
    favorite_programs: list[Program]
    favorite_channels: list[Channel]
