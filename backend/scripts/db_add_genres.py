from limehd.dependencies import get_db
from limehd.models import Program

st = set()

db = next(get_db())
with open("genres.txt", "r", encoding="utf-8") as f:
    for s in f:
        vals = s.split(',')
        program_id = int(vals[0])
        genre = vals[-1].strip('\n _.')
        genre = genre.rstrip('\n')
        if genre == 'образовательный':
            genre = 'образовательное'
        if genre == 'документальный':
            genre = 'документальное'
        if genre == 'кулинарный':
            genre = 'кулинарное'
        if genre == 'спортен' or genre == 'спорт' or genre == 'cпорт':
            genre = 'cпорт'
        if genre == 'религиозный' or genre == 'религиозное':
            genre = 'религия'
        if genre == 'обучающий' or genre == 'исторический':
            genre = 'обучающее'
        if genre == 'музыкальный':
            genre = 'музыкальное'
        if genre == 'фэнтази':
            genre = 'фэнтези'
        if genre == 'разборка' or genre == 'телевизионное' or genre == 'общественное':
            genre = 'разное'
        if genre == 'мультфильмы' or genre == 'анимация':
            genre = 'мультфильм'
        st.add(genre)
        # print(program_id, genre)
        db.query(Program).filter(Program.id == program_id).update({'genre': genre})

db.commit()

for s in st:
    print(s)
