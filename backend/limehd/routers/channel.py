from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

channel_router = APIRouter(
    prefix="/channel",
    tags=["Channel"],
)


@channel_router.get(path="")
def get_channels(
        search_name: str = None,
        db: Session = Depends(get_db),
) -> schemas.ChannelList:
    channels = crud.get_channels(db, search_name=search_name)
    return serializers.get_channel_list(channels)


@channel_router.get(path="/{id}")
def get_channel_by_channel_id(
        id: int,
        db: Session = Depends(get_db),
) -> schemas.Channel:
    channel = crud.get_channel_by_channel_id(db, id=id)
    return serializers.get_channel(channel)


@channel_router.post(path="/{channel_id}/rating")
def add_channel_rating(
    channel_id: int,
    mark: int,
    db: Session = Depends(get_db),
):
    crud.update_channel_rating(db, channel_id=channel_id, mark=mark)
    return {"message": f"Rating updated for channel with ID {id}"}


@channel_router.post(path="/{channel_id}/like")
def like_channel(response: Response,
                 channel_id: int,
                 user: models.User = Depends(current_user),
                 db: Session = Depends(get_db),
                 ) -> dict:
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    crud.add_subscriber_to_channel(db, user_id=user.id, channel_id=channel_id)
    return {"message": f"User with ID {user.id} subscribed to channel with ID {id}"}
