import json

data = dict()
encoding = "utf-8-sig"
ingList = set()

with open("./subway menu/menu.txt", "r", encoding=encoding) as f:
    menu = f.read()
    
    for line in menu.splitlines():
        if line.startswith("<"): # <샌드위치> <샐러드>
            current_category = line[1:-1]
        elif line.startswith("[menu:"): # [menu: 에그마요]
            current_menu = line[6:-1]
        elif line.startswith("[start]"): # 재료들
            ingredients = list(map(str.strip, line[7:-5].split(",")))
            current_menu = current_menu+" "+current_category
            data[current_menu] = dict()
            data[current_menu]["ingredients"] = ingredients
            data[current_menu]["name"] = current_menu
            ingList.update(ingredients)
        elif line == "":
            continue
        else:
            print(line)

with open('./subway menu/data.json', 'w', encoding=encoding) as file:
    json.dump(data, file, ensure_ascii=False)

print(ingList)