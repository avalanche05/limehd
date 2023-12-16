from datetime import timedelta
import time
from functools import partial
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from scheduler import Scheduler

from models import User
from mailing import mailing


db_url = os.getenv('db_url')
engine = create_engine(db_url)
Session = sessionmaker(bind=engine)
session = Session()
schedule = Scheduler()


user_program = set()
while True:
    users = session.query(User).all()
    print(len(users))
    for user in users:
        if user.email:
            print(2)
            for program in user.programs:
                print(3)
                if (user.id, program.id) not in user_program:
                    for stream in program.streams:
                        print(program.name)
                        print(stream.channel.name)
                        print(stream.start)
                        data = {
                            'program_name': program.name,
                            'channel': stream.channel.name,
                            'time': stream.start,
                        }
                        partial_foo = partial(mailing, data, user.email)
                        schedule.once(stream.start - timedelta(minutes=10), partial_foo)
                        print(stream.start - timedelta(minutes=10))
                user_program.add((user.id, program.id))
                print([user.id, program.id])

    time.sleep(60)
