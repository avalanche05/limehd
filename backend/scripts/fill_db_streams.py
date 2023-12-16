from psycopg2.errors import UniqueViolation
from sqlalchemy.exc import IntegrityError

from limehd.dependencies import get_db
from limehd import models
from limehd.models.stream import Stream
from scripts.norm_res_2 import data

db = next(get_db())
channels = data.keys()
for channel in channels:
    streams = data[channel]
    db_channel = db.query(models.Channel).filter(models.Channel.name == channel).first()
    for stream in streams:
        print('program', stream)
        stream_id = db.query(Stream).filter(Stream.id == stream['id'])
        if stream_id is None:
            name = stream['title']
            db_program = db.query(models.Program).filter(models.Program.name == name).first()
            db_stream = Stream(
                id=stream['id'],
                start=stream['start'],
                finish=stream['finish'],
                channel_id=db_channel.id,
                program_id=db_program.id
            )
            db.add(db_stream)

db.commit()
print('Success!')
