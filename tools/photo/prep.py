"""Готує обране фото для застосунку.
   python tools/photo/prep.py <id> <NN>   (NN — номер кандидата з candidates/<id>/sheet.jpg)
   → english-app/img/photo/<id>.jpg (до 1200×800, JPEG q75, ~100–180 КБ) + tools/photo/out/<id>.photo.json (автор, ліцензія)."""
import os, sys, json, io, time, urllib.request, urllib.parse
try: sys.stdout.reconfigure(encoding="utf-8")   # імена авторів нелатинкою в консолі Windows (cp1251)
except Exception: pass
from PIL import Image
here = os.path.dirname(os.path.abspath(__file__))
sid, num = sys.argv[1], sys.argv[2].zfill(2)
meta = json.load(open(os.path.join(here, 'candidates', sid, 'meta.json'), encoding='utf-8'))
m = next(x for x in meta if x['file'] == num + '.jpg')
UA = {'User-Agent': 'EngLift-photo-trainer/1.0 (educational offline app; contact via GitHub)'}
api = ('https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=1400&titles='
       + urllib.parse.quote(m['title']))
info = json.load(urllib.request.urlopen(urllib.request.Request(api, headers=UA), timeout=30))
page = next(iter(info['query']['pages'].values()))
url = page['imageinfo'][0]['thumburl']
time.sleep(0.5)
raw = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
im = Image.open(io.BytesIO(raw)).convert('RGB')
im.thumbnail((1200, 800), Image.LANCZOS)
dst_dir = os.path.join(here, '..', '..', 'english-app', 'img', 'photo')
os.makedirs(dst_dir, exist_ok=True)
dst = os.path.join(dst_dir, sid + '.jpg')
im.save(dst, 'JPEG', quality=75, optimize=True, progressive=True)
os.makedirs(os.path.join(here, 'out'), exist_ok=True)
credit = {'file': 'img/photo/' + sid + '.jpg', 'width': im.width, 'height': im.height, 'title': m['title'].replace('File:', ''),
          'page': m['page'], 'author': m['author'] or 'Unknown', 'license': m['license'], 'licenseUrl': m['licenseUrl']}
json.dump(credit, open(os.path.join(here, 'out', sid + '.photo.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('saved', dst, im.size, round(os.path.getsize(dst) / 1024), 'KB —', credit['license'], '—', credit['author'])
