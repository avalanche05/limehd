from datetime import datetime
from pydantic import BaseModel


class Stream(BaseModel):
    id: int
    channel_id: int
    start: datetime
    finish: datetime
    program_id: int
