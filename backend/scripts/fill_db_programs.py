from limehd.dependencies import get_db
from limehd.models.program import Program
from scripts.a import data

program_names = {}

db = next(get_db())
channels = data.keys()
for channel in channels:
    programs = data[channel]
    for program in programs:
        if program['title'] not in program_names:
            print('program', program)
            db_program = Program(
                name=program['title'],
                description=program['description'],
                image=program['image'],
                genre='program_genre',
                category=program['category'],
                start=program['start'],
                finish=program['finish']
            )
            program_names[program['title']] = db_program
            db.add(db_program)

db.commit()



