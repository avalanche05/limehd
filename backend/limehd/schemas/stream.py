from datetime import date
from pydantic import BaseModel

from .channel import Channel
from .program import Program


class Stream(BaseModel):
    chanel: Channel
    start: date
    end: date
    program: Program