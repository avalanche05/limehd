from datetime import date
from pydantic import BaseModel

from .stream import Stream


class Program(BaseModel):
    id: int
    name: str
    start: date
    finish: date
    rating: float
    genre: str
    category: str
    image: str
    streams: list[Stream]