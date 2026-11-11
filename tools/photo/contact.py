"""Контактні аркуші кандидатів: candidates/<id>/sheet.jpg — 8 прев'ю з номерами (для вибору фото)."""
import os, sys, json
from PIL import Image, ImageDraw, ImageFont
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'candidates')
ids = sys.argv[1:] or sorted(os.listdir(root))
for sid in ids:
    d = os.path.join(root, sid)
    files = sorted(f for f in os.listdir(d) if f[:2].isdigit() and f.endswith('.jpg'))
    W, H, cols = 360, 240, 4
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * W, rows * H), 'white')
    dr = ImageDraw.Draw(sheet)
    try: font = ImageFont.truetype('arial.ttf', 34)
    except Exception: font = ImageFont.load_default()
    for i, f in enumerate(files):
        im = Image.open(os.path.join(d, f)).convert('RGB'); im.thumbnail((W - 6, H - 6))
        x, y = (i % cols) * W, (i // cols) * H
        sheet.paste(im, (x + 3, y + 3))
        dr.rectangle([x + 3, y + 3, x + 56, y + 44], fill='black'); dr.text((x + 8, y + 5), f[:2], fill='yellow', font=font)
    sheet.save(os.path.join(d, 'sheet.jpg'), quality=80)
print('sheets:', len(ids))
