from fastapi import APIRouter, Body, Depends, HTTPException, Response, HTTPException, status
from requests import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db
from limehd.dependencies import current_user
from limehd.schemas import LoginSchema
from limehd.crud import get_by_email
from limehd.models import User
from limehd.serializers import serialize_user


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

@user_router.post('/register')
def register(login_schema: LoginSchema, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    user_by_email = get_by_email(db, login_schema.login)
    if not user_by_email:
        user_by_email = User(
            email=login_schema.login,
            fingerprint=user.fingerprint
        )
        user_by_email.set_password(login_schema.password)
        db.add(user_by_email)
        db.commit()
        db.refresh(user_by_email)
        return serialize_user(user_by_email)
    else:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Логин уже зарегистрирован")


@user_router.post("/login")
def login(login_schema: LoginSchema, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    user_by_email = get_by_email(db, login_schema.login)
    print(user_by_email)
    if user_by_email and user_by_email.check_password(login_schema.password):
        user_by_email.fingerprint = user.fingerprint
        db.commit()
        db.refresh(user_by_email)
        return serialize_user(user_by_email)
    else:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Неправильный логин или пароль")


@user_router.get(path="/subscriptions")
def get_user_subsctiptions(response: Response,
                           user: models.User = Depends(current_user),
                           db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)

    favorite_programs = crud.get_favorite_programs(db, user)
    favourite_streams = crud.get_favorite_streams(db, favorite_programs)
    print('favorite', favorite_programs)
    print(user.id)
    for stream in favourite_streams:
        print(stream)
    return favourite_streams
