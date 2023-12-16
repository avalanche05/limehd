from scripts.a import data

print(*(" ".join([t["title"], t["description"]]) for t in data['Первый']), sep="\n")
