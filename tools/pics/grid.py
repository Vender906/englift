"""Сітка для вибору фото: python tools/pics/grid.py <pos>-<cat> <set> [<set> …] [--from N --to M]
   Для кожного слова — кандидати з усіх наборів підряд (pixabay 1–4, pixabay-food 5–8 …), великими клітинками."""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps
DIR = os.path.dirname(os.path.abspath(__file__))
a = sys.argv[1:]
def opt(n, d):
    if '--' + n in a:
        i = a.index('--' + n); v = a[i + 1]; del a[i:i + 2]; return int(v)
    return d
fr, to, PER = opt('from', 0), opt('to', 10**9), opt('per', 4)
name, sets = a[0], a[1:]
ids = sorted(os.listdir(os.path.join(DIR, 'photo-cand', sets[0], name)), key=int)[fr:to]
C, L = 120, 150
cols = PER * len(sets)
W = Image.new('RGB', (L + cols * C, len(ids) * C), 'white')
dr = ImageDraw.Draw(W); f = ImageFont.truetype('arial.ttf', 15); fb = ImageFont.truetype('arialbd.ttf', 16)
for r, d in enumerate(ids):
    y = r * C; k = 0
    for s in sets:
        base = os.path.join(DIR, 'photo-cand', s, name, d)
        m = json.load(open(os.path.join(base, 'meta.json'), encoding='utf-8'))
        if s == sets[0]:
            dr.text((6, y + 35), d, fill='#888', font=f); dr.text((6, y + 55), m['en'], fill='black', font=fb)
            dr.text((6, y + 78), m['uk'][:18], fill='#666', font=f)
        for j in range(PER):
            if j < len(m['cands']):
                im = ImageOps.fit(Image.open(os.path.join(base, m['cands'][j]['file'])).convert('RGB'), (C - 4, C - 4))
                W.paste(im, (L + k * C + 2, y + 2))
                dr.rectangle([L + k * C + 2, y + 2, L + k * C + 22, y + 20], fill='black')
                dr.text((L + k * C + 6, y + 3), str(k + 1), fill='yellow', font=fb)
            k += 1
out = os.path.join(DIR, 'grid-%s-%d.png' % (name, fr)); W.save(out); print(out)
