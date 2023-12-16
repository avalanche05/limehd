from b import data

from requests import get
from bs4 import BeautifulSoup
from time import sleep
import json
from random import randint

schedule = {}
k = 0
for i in range(len(data['schedule']['schedules'])):
    title_canal = data['schedule']['schedules'][i]['channel']['title']
    print(data['schedule']['schedules'][i]['channel'])