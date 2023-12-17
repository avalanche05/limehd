from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

genre_router = APIRouter(
    prefix="/genre",
    tags=["Genre"],
)


@genre_router.get(path="")
def get_genres(response: Response,
               user: models.User = Depends(current_user),
               db: Session = Depends(get_db)) -> list[str]:
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)

    genres = crud.get_genres(db)
    return genres
