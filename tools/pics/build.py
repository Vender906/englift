"""EngLift — збірка фото до слів.
   python tools/pics/build.py [--sheet]   (--sheet: ще й аркуш вибраних фото sheet-<pos>.png для перегляду)
   Читає picks.json ({ "<pos>": { "<_id>": "<набір>/<N>" | null } }, напр. "pixabay-food/2" — кандидат №2
   з photo-cand/pixabay-food/<pos>-<cat>/<_id>/), обрізає до квадрата SIZE px, JPEG ->
   english-app/img/pics/<pos>/<_id>.jpg; пише english-app/js/lexis/pics-data.js і credits.json (автор, сторінка).
   Фото — Pixabay (Pixabay Content License: вільно, підпис не обов'язковий; у застосунку — «Фото: Pixabay»)."""
import json, os, glob
from PIL import Image, ImageOps

DIR = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(DIR, '..', '..', 'english-app')
SIZE = 256


def cand(pos, wid, ref):
    """«pixabay-food/2» -> (шлях до файлу, запис meta) серед усіх категорій цього набору"""
    s, n = ref.split('/')
    for d in glob.glob(os.path.join(DIR, 'photo-cand', s, pos + '-*', str(wid))):
        m = json.load(open(os.path.join(d, 'meta.json'), encoding='utf-8'))
        c = m['cands'][int(n) - 1]
        return os.path.join(d, c['file']), c
    raise FileNotFoundError('%s/%s: %s' % (pos, wid, ref))


def build():
    picks = json.load(open(os.path.join(DIR, 'picks.json'), encoding='utf-8'))
    data, credits = {}, {}
    for pos, m in picks.items():
        out = os.path.join(APP, 'img', 'pics', pos)
        os.makedirs(out, exist_ok=True)
        ids = sorted(int(k) for k, v in m.items() if v)
        keep = {'%d.jpg' % i for i in ids}
        for f in os.listdir(out):
            if f not in keep:
                os.remove(os.path.join(out, f))
        credits[pos] = {}
        for i in ids:
            path, c = cand(pos, i, m[str(i)])
            im = ImageOps.fit(Image.open(path).convert('RGB'), (SIZE, SIZE), Image.LANCZOS, centering=(0.5, 0.45))
            im.save(os.path.join(out, '%d.jpg' % i), quality=74, optimize=True, progressive=True)
            credits[pos][i] = {'author': c['author'], 'page': c['page'], 'license': c['license']}
        data[pos] = ids
        size = sum(os.path.getsize(os.path.join(out, f)) for f in os.listdir(out))
        print('%s: %d photos, %.0f KB' % (pos, len(ids), size / 1024))
    with open(os.path.join(APP, 'js', 'lexis', 'pics-data.js'), 'w', encoding='utf-8') as f:
        f.write('/* EngLift — слова з фото: img/pics/<pos>/<_id>.jpg. Згенеровано tools/pics/build.py — не редагувати вручну.\n'
                '   Фото: Pixabay (Pixabay Content License); автори — tools/pics/credits.json. */\n'
                'window.LEX_PICS = ' + json.dumps(data, separators=(',', ':')) + ';\n')
    json.dump(credits, open(os.path.join(DIR, 'credits.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def sheet():
    from PIL import ImageDraw, ImageFont
    from common_words import words
    picks = json.load(open(os.path.join(DIR, 'picks.json'), encoding='utf-8'))
    for pos, m in picks.items():
        en = words(pos)
        ids = sorted(int(k) for k, v in m.items() if v)
        C, cols = 140, 10
        W = Image.new('RGB', (cols * C, ((len(ids) + cols - 1) // cols) * (C + 22)), 'white')
        d = ImageDraw.Draw(W); f = ImageFont.truetype('arial.ttf', 13)
        for k, i in enumerate(ids):
            x, y = (k % cols) * C, (k // cols) * (C + 22)
            W.paste(Image.open(os.path.join(APP, 'img', 'pics', pos, '%d.jpg' % i)).resize((C - 8, C - 8)), (x + 4, y + 4))
            d.text((x + 4, y + C - 2), '%d %s' % (i, en.get(i, '?'))[:20], fill='black', font=f)
        out = os.path.join(DIR, 'sheet-%s.png' % pos); W.save(out); print(out)


if __name__ == '__main__':
    import sys
    build()
    if '--sheet' in sys.argv:
        sheet()
