# «Що на фото» — how to choose a photo and annotate it

EngLift is an offline English-learning app for **Ukrainian speakers**. In the trainer «Що на фото» the learner sees a
photo and has 90 seconds to type as many English words as possible that describe it — nouns (things they see),
adjectives (how things look) or verbs (what people/animals are doing), or a mix. There is **no AI checking**: every
typed word is compared with the word list you write. After the round the learner sees the words they missed, with
Ukrainian translations — so the list is also teaching material.

## Step 1 — choose the photo

1. Look at `tools/photo/candidates/<id>/sheet.jpg` (8 previews, numbered) and `meta.json` (title, author, licence).
2. A good photo: a real **photo** (not a painting, drawing, collage, map), sharp and well lit, **rich** (many different
   visible things and at least a few people or animals doing something), matching the scene name, landscape
   orientation preferred. Avoid: photos where a single object fills the frame, text-heavy signs/ads as the main
   subject, logos/brands as the focus, anything violent or sexual, identifiable people in private/embarrassing situations.
3. If no candidate is good, search again with your own query (replaces the candidates), then rebuild the sheet:
   `node tools/photo/fetch-candidates.js <id> --query "your words"` and `python tools/photo/contact.py <id>`.
   Try 2–4 different queries before settling for a weaker photo.
4. Prepare it: `python tools/photo/prep.py <id> <NN>` → `english-app/img/photo/<id>.jpg` + `tools/photo/out/<id>.photo.json`.
5. **Open the prepared `english-app/img/photo/<id>.jpg` and annotate THAT image** (look at it carefully — zoom-level
   details matter, previews are too small).

## Step 2 — annotate: `tools/photo/out/<id>.json`

Copy `id`, `uk`, `emoji` from `tools/photo/scenes.json` (you may improve `uk` to describe your photo), add `en` —
a short English title. Then three lists. Reference: `tools/photo/out/park.json`.

```json
{ "en": "path", "uk": "доріжка / стежка", "lvl": "A2", "alt": ["footpath", "walkway"] }
```

- `en` — base form: noun in the **singular** (plural-only nouns as is: *jeans, scissors*), verb in the **infinitive**
  without *to* (*sit*, *pick up*), adjective in the positive form. Lowercase. The checker accepts plurals, -ing/-ed/-s
  forms, and one small typo automatically — do **not** list those forms.
- `uk` — short natural Ukrainian translation for this photo (two options with ` / `). Apostrophe `ʼ` (U+02BC).
- `lvl` — rough CEFR level of the word (A1–C1).
- `alt` — optional: other English words a learner might reasonably type **for the same thing in this photo**
  (synonyms, BrE/AmE: *trousers* / *pants*, *rubbish* / *trash*; a more general or specific word: *flower* / *daisy*).
  Every alt is accepted as a hit for this item. An alt must not repeat another item's `en` in the same list.

### What to include

- **Only what is really visible** in this photo (or a directly visible action / quality). If you have to guess, leave it out.
- **nouns: 25–45** — objects, people, animals, places, parts of the scene (sky, cloud, ground, wall, window), clothes,
  body parts that are clearly seen. Include easy A1 words (they are what learners will type first) **and** useful
  harder words (B1–C1) for things actually there.
- **adjs: 12–25** — colours that are clearly present, sizes, shapes, materials (*wooden, metal*), weather/light (*sunny,
  cloudy, bright*), how people look (*happy, busy, young*), the place (*crowded, quiet, modern, old*).
- **verbs: 10–20** — what people / animals / things in the photo are doing (*sit, walk, hold, wear, smile, cook*);
  states are fine if clearly shown (*wait, lie, grow, shine*).
- No duplicates inside a list. The same English word may appear in two lists only if it is genuinely both
  (rare: *light* n. and adj.).

### Credit
`tools/photo/out/<id>.photo.json` is written by `prep.py` — don't edit it. The app shows author and licence under the photo.

Check: `node tools/photo/build.js` — validates every scene and builds `english-app/js/practice/photo-data.js`.
Fix every ✗ error; ⚠ warnings — look and decide.
