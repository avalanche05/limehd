from typing import List, Type

from sqlalchemy.orm import Session
from limehd import models, schemas


def get_favorite_streams(db: Session, programs: List[models.Program]) -> List[models.Stream] | None:
    streams = []
    for program in programs:
        for program_stream in program.streams:
            streams.append(program_stream)

    return streams
