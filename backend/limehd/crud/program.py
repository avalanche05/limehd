from typing import List, Type

import pytz as pytz
from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import serializers
from limehd import models, schemas
from datetime import datetime
from Levenshtein import distance
from limehd.models import Program


def comparator(item: str, search_name: str, threshold: int = 3) -> list:
    item = item.lower().strip()
    search_name = search_name.lower().strip()
    return [distance(item, search_name), abs(len(item) - len(search_name)), len(item) - len(search_name)]


def get_program_by_program_id(db: Session, id: int) -> models.Program:
    program = db.query(models.Program).filter(models.Program.id == id).first()
    return program


def get_programs(
        db: Session,
        start: datetime = None,
        finish: datetime = None,
        genre: str = None,
        category: str = None,
        search_name: str = None
):
    query = db.query(models.Program)

    if genre:
        query = query.filter(models.Program.genre == genre)
    if category:
        query = query.filter(models.Program.category == category)

    programs = query.all()

    if search_name:
        programs = sorted(programs, key=lambda x: comparator(x.name, search_name))
        programs = [program for program in programs if
                    distance(program.name.lower().strip(), search_name.lower().strip()) <= 3]
        if distance(programs[0].name.lower().strip(), search_name.lower().strip()) == 0:
            programs = programs[:1]

    programs = programs[:min(100, len(programs))]
    if start and finish:
        desired_timezone = pytz.timezone('Europe/Moscow')
        moscow_datetime = start.astimezone(desired_timezone)
        start = moscow_datetime.replace(tzinfo=None)

        desired_timezone = pytz.timezone('Europe/Moscow')
        moscow_datetime = finish.astimezone(desired_timezone)
        finish = moscow_datetime.replace(tzinfo=None)
        for program in programs:
            streams = []
            for stream in program.streams:
                if stream.start >= start and stream.finish <= finish:
                    streams.append(stream)
            program.streams = streams

    programs = sorted(programs, key=lambda x: -x.rating)

    return programs


def add_subscriber_to_program(db: Session, user_id: int, program_id: int):
    program = db.query(models.Program).filter(models.Program.id == program_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if program and user:
        program.subscribers.append(user)
        db.commit()


def get_favorite_programs(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user.programs


def update_program_rating(db: Session, program: Program, mark: int):
    program.votes_count += 1
    program.rating = ((float(program.rating) * (program.votes_count - 1)) + int(mark)) / program.votes_count
    db.commit()
    return program
