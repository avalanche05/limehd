from limehd.dependencies import get_db
from limehd.models.channel import Channel

db = next(get_db())

db_chanel = Channel(
    name="m3",
    description="chanel_description",
    image="chanel_image_link",
    stream_link="chanel_stream_link"
)

db.add(db_chanel)
db.commit()
