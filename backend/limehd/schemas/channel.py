from pydantic import BaseModel

from .stream import Stream


class Channel(BaseModel):
    id: int
    name: str
    rating: float
    description: str
    image: str
    is_favorite: bool
    stream_link: str
    schedule: list[Stream]
