from datetime import timedelta
import time
from functools import partial
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from scheduler import Scheduler

from models import User
from mailing import send_mail


db_url = os.getenv('db_url')
engine = create_engine(db_url)
Session = sessionmaker(bind=engine)
session = Session()
schedule = Scheduler()


user_program = set()
while True:
    users = session.query(User).all()
    for user in users:
        if user.email:
            for program in user.programs:
                if (user.id, program.id) not in user_program:
                    for stream in program.streams:
                        data = {
                            'program_name': program.name,
                            'channel': stream.channel.name,
                            'time': stream.start.strftime("%H:%M"),
                            'link': stream.channel.stream_link
                        }
                        # partial_foo = partial(mailing, data, 'fadeevvanya@gmail.com')
                        schedule.once(stream.start - timedelta(10), send_mail, args=(data, user.email, ))
                user_program.add((user.id, program.id))

    schedule.exec_jobs()
    time.sleep(60)
