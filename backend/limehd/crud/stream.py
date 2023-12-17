from datetime import datetime
from typing import List, Type

from sqlalchemy.orm import Session
from limehd import models, schemas


def get_favorite_streams(db: Session, programs: List[models.Program], start: datetime,
                         finish: datetime) -> list[int] | None:
    streams = []
    for program in programs:
        for program_stream in program.streams:
            if start is None:
                start = datetime(2003, 12, 16)
            if finish is None:
                finish = datetime(2033, 12, 16)
            if program_stream.start >= start and program_stream.finish <= finish:
                streams.append(program_stream)

    return streams


def get_streams_by_stream_ids(db: Session, streams_ids: list[int]) -> List[models.Stream] | None:
    streams = db.query(models.Stream).filter(models.Stream.id.in_([streams_ids])).all()
    return streams