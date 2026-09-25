# Word on Demand — how to write situations for verbs

EngLift is an English-learning app for **Ukrainian speakers**. The Word on Demand trainer shows the learner a
situation and a thought **in Ukrainian**. The learner must say that thought **in English using one specific target verb**,
which is hidden until they try or ask for a hint. It trains *active recall*: "I want to say X — which English word do I need?"

Your job: for every verb in your batch file, write one entry with **3 situations**.

## Input (batches/NNN.json)

Each item: `id`, `en` (the target word/expression), `uk` (the meaning to train), `lvl` (CEFR), optional `ctx`/`uCtx`
(typical context), `past`/`pp` (dictionary forms), `ex` (example), `topics` (dictionary categories),
and sometimes `otherMeanings` — other senses of the same word that are trained separately: **do not use them**.
Train exactly the meaning given in `uk`.

## Output entry (JSON)

```json
{
  "id": 105, "w": "forget", "uk": "забувати", "lvl": "A1",
  "forms": "forget|forgets|forgot|forgotten|forgetting",
  "near": "left|leave|leaving|slipped my mind|did not remember|do not remember",
  "tasks": [
    {
      "sit": "Ти прийшов на зустріч і не можеш показати фото, бо телефону при тобі немає.",
      "say": "Я забув узяти телефон.",
      "ans": ["I forgot to bring my phone.", "I forgot my phone.", "I forgot to take my phone with me."],
      "keys": { "телефон": "phone|mobile|cell*" }
    },
    …two more tasks…
  ]
}
```

Copy `id`, `lvl` from the input; `w` = input `en` **exactly** (including any parentheses). `uk` = a short Ukrainian
translation of the trained meaning (usually the input `uk`, you may polish it).

### forms — the FIRST word of the expression, 5 slots
`base|3rd person -s|past (V2)|past participle (V3)|-ing`, alternatives with `/`.
- `forget|forgets|forgot|forgotten|forgetting`
- `realize/realise|realizes/realises|realized/realised|realized/realised|realizing/realising`
- `be/am/are|is|was/were|been|being`
- hyphenated verb = one word: `double-check|double-checks|double-checked|double-checked|double-checking`
- multi-word expression (`give up`, `top up a card`, `bear in mind`): forms of the **first word only** (`give|gives|gave|given|giving`), the rest goes to `tail`.

V2/V3 must agree with the input `past`/`pp`.

### tail — required for multi-word expressions
The remaining words of the expression that must appear in the answer after the verb (within ~5 words, any order; words may also stand up to 3 words before the verb — "I deeply appreciate", "my flight has been delayed" —
so separable phrasal verbs work: *gave it up*, *gave smoking up*).
- Drop articles and possessives/placeholders (a, the, your, my, one's, sb, sth…): `top up a card` → `"tail": "up card*"`, `slip your mind` → `"tail": "mind"`.
- `*` = any ending (for words that inflect or vary): `toss and turn` → `"tail": "and turn*"`.
- `/` = alternatives: `stumble upon` → `"tail": "upon/on"`.
- Keep only what is truly essential, and write answers where the expression stays compact.
Omit `tail` for single-word verbs.

### near — synonyms that also fit, but are not the target
Pattern (syntax below) of words a learner may use *instead* of the target: the app then says "that fits, but we are
training another word". Include common synonyms/alternatives in their forms. Never include the target's own forms.

### tasks — exactly 3, in 3 DIFFERENT life areas
- `sit` — 1–2 short sentences in Ukrainian setting the scene (who, where, why you speak). Address the learner as «ти».
  Prefer wording without gendered past tense; if unavoidable, use the masculine form (as in the example).
- `say` — the thought to express, in natural Ukrainian, usually first person. **Only Ukrainian — no Latin letters** (except abbreviations such as GPS, TV, SMS).
  The thought must make the target verb the natural choice for a native speaker (the learner should be able to *arrive*
  at this word), not a stretch where everyone would say something else.
- `ans` — 3 different natural English sentences, **each using the target** (any form):
  - A — the simplest complete answer (it is also shown with the word gapped as hint 1, so it must be a full, natural sentence);
  - B — a different structure / tense / word order;
  - C — the most conversational, how a native speaker would really say it.
  English at the entry's level (A1–A2: short simple sentences; C1: may be richer). Use ’ or ' for apostrophes.
- `keys` — 1–3 key ideas of `say` **other than the target verb**, as `{ "Ukrainian label": "pattern" }`.
  The learner's answer is accepted if it contains the target verb and at least half of the keys, so patterns must be
  **broad**: include synonyms and word families any reasonable learner might use (`"phone|mobile|cell*"`,
  `"birthday*|b-day"`, `"money|cash|pay*|paid"`). All three `ans` must match all keys.
  Pick concrete content ideas (objects, time, people, negation), not function words.

### Pattern syntax (keys, near)
Matched against the answer in lower case, with contractions expanded (didn’t → did not, I’m → I am, can’t → can not).
`|` separates alternatives; each alternative is one or more whole words; `*` = any ending (`stair*` = stair, stairs, staircase).
`"not fall|never fell|kept my balance"` — multi-word alternatives are fine.

### Practical tips (learned from earlier batches)
- Contractions (I’m, don’t, she’s, we’ll) are fine in answers.
- Number/ordinal keys: `nine*` does not match `ninth` — write `nin*|9*`.
- The grammar checker can misfire on unusual structures (e.g. "for it, raise your hand" reads as "it raise") — just rephrase.
- If the dictionary meaning sounds stiff in modern English (e.g. "rise" = get up), pick situations where the verb in THIS
  meaning family is really natural, and say so in your final report.
- If `otherMeanings` nearly coincide with yours, simply train the meaning in `uk` and phrase the Ukrainian so it points to it.

## Quality bar
- Every sentence must be something a native speaker would actually say. No textbook-weird sentences, no literal calques.
- Ukrainian must be natural and correct (not a translation of the English).
- Vary the scenes across the batch: home, work, friends, travel, shopping, health, study, city, hobbies, online…
  Do not start most `sit`s with «Друг питає…».
- Train the exact meaning in `uk` (and `ctx`), not other meanings of the word.
- For very formal/technical/niche verbs, still find realistic situations (work, news, studies, specialist hobbies).

## Workflow
1. Read your batch file `tools/wod/batches/NNN.json`.
2. Write the first half of the entries (items 1–25) to `tools/wod/out/NNN.a.json` and the rest to `tools/wod/out/NNN.b.json`
   — each file is a JSON array of entries, in batch order.
3. Validate: `node tools/wod/validate.js tools/wod/out/NNN.a.json tools/wod/out/NNN.b.json`.
   It runs every answer through the app's real checker: target found, all keys matched, no grammar alarms, forms agree
   with the dictionary. Fix every reported error (rephrase the answer, broaden a key pattern, fix forms/tail) and
   re-run until it reports **0 with errors**. Do not weaken keys into meaningless patterns just to pass.
4. Touch no other files.
