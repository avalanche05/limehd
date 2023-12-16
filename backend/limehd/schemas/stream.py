from datetime import datetime
from pydantic import BaseModel

from .channel import Channel
from .program import Program


class Stream(BaseModel):
    id: int
    channel: Channel
    start: datetime
    end: datetime
    program: Program
