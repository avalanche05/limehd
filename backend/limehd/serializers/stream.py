from sqlalchemy.orm import Session

from limehd.models import stream as db_model_stream
from limehd import schemas, serializers
from .program import get_program


def get_stream(db_stream: db_model_stream.Stream) -> schemas.Stream:
    stream = schemas.Stream(
        id=db_stream.id,
        channel_id=db_stream.channel_id,
        start=db_stream.start,
        finish=db_stream.finish,
        program=get_program(db_stream.program, is_empty_streams=True)
    )

    return stream


def get_streams(db_streams: list[db_model_stream.Stream]) -> list[schemas.Stream]:
    return [get_stream(db_stream) for db_stream in db_streams]
