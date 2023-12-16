from sqlalchemy.orm import Session

from limehd.models import stream as db_model_stream
from limehd import schemas, serializers


def get_stream(db_stream: db_model_stream.Stream) -> schemas.Stream:
    stream = schemas.Stream(
        id=db_stream.id,
        channel_id=db_stream.channel_id,
        start=db_stream.start,
        finish=db_stream.finish,
        program_id=db_stream.program_id
    )

    return stream
