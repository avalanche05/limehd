from limehd.dependencies import get_db
from limehd.models.channel import Channel
from scripts.a import data

db = next(get_db())
channels = data.keys()
for channel in channels:
    db_chanel = Channel(
        name=channel,
        description="chanel_description",
        rating=0.0,
        votes_count=0,
        image="chanel_image_link",
        stream_link="chanel_stream_link"
    )
    db.add(db_chanel)

db.commit()
