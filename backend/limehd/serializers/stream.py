from sqlalchemy.orm import Session

from limehd.models import stream as db_model_stream
from limehd import schemas, serializers


def get_stream(db: Session, db_stream: db_model_stream.Stream) -> schemas.Stream:
    stream = schemas.Stream(
        id=db_stream.id,
        channel=db_stream.channel,
        start=db_stream.start,
        finish=db_stream.finish,
        program=db_stream.program
    )

    return stream
