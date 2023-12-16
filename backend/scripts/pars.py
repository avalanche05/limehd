from a import data

from requests import get
from bs4 import BeautifulSoup
from time import sleep
import json
from random import randint

print(data)

# k = 0
# for i in range(len(d['schedules'])):
#     title_canal = d['schedules'][i]['channel']['title']
#     schedule.setdefault(title_canal, [])
#     for content in d['schedules'][i]['events']:
#         if 'mainImageBaseUrl' not in content['program']:
#             continue
#         image = content['program']['mainImageBaseUrl']
#         parts = image.split("/")
#         result = "/".join(parts[3:])
#         url = f"https://tv.yandex.ru/program/{content['program']['transliteratedTitle']}?eventId={content['id']}"
#         sleep(randint(2, 3))
#         response = get(url).content
#         soup = BeautifulSoup(response, 'html.parser')
#         meta_tags = soup.find_all('meta', {'name': 'description'})
#         description = meta_tags[0].get('content')
#         program = {
#             'id': content['id'],
#             'title': content['program']['title'],
#             'description': description,
#             'image': 'https://avatars.mds.yandex.net/' + result + '/640x480',
#             'category': content['program']['type']['name'],
#             'start': content['start'],
#             'finish': content['finish']
#         }
#         schedule[title_canal].append(program)
#         k += 1
#         print(k, program)
#
#
# with open('norm-res-2.txt', 'w') as f:
#     f.write(json.dumps(schedule, ensure_ascii=False))
#
# k = 0
# with open("res2.txt", "w") as f:
#     for i in range(len(d['schedules']['schedules'])):
#         title_canal = d['schedules'][i]['channel']['title']
#         schedule.setdefault(title_canal, [])
#         for content in d['schedules'][i]['events']:
#             if 'mainImageBaseUrl' not in content['program']:
#                 continue
#             image = content['program']['mainImageBaseUrl']
#             parts = image.split("/")
#             result = "/".join(parts[3:])
#             url = f"https://tv.yandex.ru/program/{content['program']['transliteratedTitle']}?eventId={content['id']}"
#             sleep(randint(3, 4))
#             response = get(url).content
#             soup = BeautifulSoup(response, 'html.parser')
#             meta_tags = soup.find_all('meta', {'name': 'description'})
#             description = meta_tags[0].get('content')
#             program = {
#                 'id': content['id'],
#                 'title': content['program']['title'],
#                 'description': description,
#                 'image': 'https://avatars.mds.yandex.net/' + result + '/640x480',
#                 'category': content['program']['type']['name'],
#                 'start': content['start'],
#                 'finish': content['finish']
#             }
#             schedule[title_canal].append(program)
#             print(program)
#             f.write(str(program) + "\n")
#             k += 1
#             print(k)
#
#
# print(schedule.keys())