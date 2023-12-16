from fastapi import APIRouter, Body, Depends, HTTPException, Response
from requests import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db
from limehd.auth import current_user
from limehd.schemas import LoginSchema

user_router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@user_router.get(path="")
def get_user(response: Response, user: models.User = Depends(current_user),
             db: Session = Depends(get_db)
             ) -> schemas.User:
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    return serializers.get_user(user)


@user_router.get(path="/subscriptions")
def get_user_subsctiptions(response: Response, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)


@user_router.post("/login")
def login(response: Response, login_schema: LoginSchema | None, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    if login_schema:
        user.login = login_schema.login
        user.set_password(login_schema.password)
    return user
