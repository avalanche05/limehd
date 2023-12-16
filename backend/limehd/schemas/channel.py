from pydantic import BaseModel


class Channel(BaseModel):
    id: int
    name: str
    rating: float
    description: str
    image: str
    is_favorite: bool
    stream_link: str
    schedule: list['Stream']
