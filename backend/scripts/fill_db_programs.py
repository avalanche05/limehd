from limehd.dependencies import get_db
from limehd.models.program import Program
from scripts.norm_res_2 import data

program_names = {}

db = next(get_db())
channels = data.keys()
for channel in channels:
    programs = data[channel]
    for program in programs:
        if program['title'] not in program_names:
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

for program_name in program_names:
    program_id = db.query(Program).filter(Program.name == program_name).first()
    if program_id is None:
        print(program_name, program_names[program_name])
        db.add(program_names[program_name])

db.commit()



