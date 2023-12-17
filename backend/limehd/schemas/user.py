from pydantic import BaseModel

from .channel import Channel
from .program import Program


class User(BaseModel):
    id: int
    email: str | None
    hashed_password: str | None
    fingerprint: str
    favorite_programs: list[Program] | None
    favorite_channels: list[Channel] | None


class User2(BaseModel):
    id: int
    email: str
    fingerprint: str
    favorite_programs: list[Program] | None
    favorite_channels: list[Channel] | None


class LoginSchema(BaseModel):
    login: str
    password: str 
