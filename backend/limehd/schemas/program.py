from datetime import datetime
from pydantic import BaseModel
from .stream import Stream


class Program(BaseModel):
    id: int
    name: str
    description: str
    rating: float
    genre: str
    category: str
    image: str
    streams: list[Stream] | None
