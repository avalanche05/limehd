from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas
from datetime import datetime


def get_program_by_program_id(db: Session, id: int) -> models.Program:
    program = db.query(models.Program).filter(models.Program.id == id).first()

    return program


def get_programs(
        db: Session,
        start_date: datetime = None,
        finish_date: datetime = None,
        genre: str = None,
        category: str = None,
        search_name: str = None
):
    query = db.query(models.Program)

    if start_date and finish_date:
        query = query.filter(models.Program.streams.any(
            models.Stream.start >= start_date,
            models.Stream.finish <= finish_date,
        ))

    if genre:
        query = query.filter(models.Program.genre == genre)
    if category:
        query = query.filter(models.Program.category == category)

    if search_name:
        query = query.filter(models.Program.name.ilike(f"%{search_name}%"))

    programs = query.all()
    return programs


def add_subscriber_to_program(db: Session, user_id: int, program_id: int):
    program = db.query(models.Program).filter(models.Program.id == program_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if program and user:
        program.subscribers.append(user)
        db.commit()