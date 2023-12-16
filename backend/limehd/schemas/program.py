from datetime import datetime
from pydantic import BaseModel


class Program(BaseModel):
    id: int
    name: str
    start: datetime
    finish: datetime
    rating: float
    genre: str
    category: str
    image: str
    streams: list['Stream']
