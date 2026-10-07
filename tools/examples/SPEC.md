# Dictionary examples — how to rewrite the example sentences (verbs, adjectives)

EngLift is an English-learning app for **Ukrainian speakers**. Every dictionary word has an example sentence
(`ex`) with a Ukrainian translation (`exUk`). The learner sees it in the word browser and on the flashcard.

**The goal:** a learner who does NOT know the target word should be able to **guess its meaning from the sentence alone**.
Today most examples are 3–5 words ("Don't gloat!", "Click here.", "Unload after the cycle.") and give no clue.

## What makes a good example

1. **The context pins down the meaning.** Put a clue right next to the word:
   - cause → effect: *"The milk was left out all night, so it **went off** and smelled terrible."*
   - explanation / paraphrase: *"He **gloated** about winning the bet, laughing at everyone who had lost money."*
   - contrast: *"She didn't just walk — she **sprinted** to catch the last bus."*
   - typical object / tool / place / result: *"She **scrubbed** the burnt pan with a brush until it was shiny again."*
   - purpose: *"I **zoomed in** on the photo to read the tiny name on the sign."*
2. **Exactly the meaning in `uk`** (plus `ctx` / `uCtx` if given). If `otherMeanings` is present, those senses are
   covered by other cards — do not drift into them. For a word like *appear* = «зʼявлятися / здаватися», pick the
   first sense unless the existing example clearly uses the other one.
3. **Easy surroundings.** The target word should be the only hard word. Other words: roughly A2–B1, everyday,
   concrete. A learner at A1/A2 should understand everything except the target.
4. **Length: 8–18 words.** One or two clauses. A full, natural sentence a native speaker would really say —
   not a dictionary fragment. Imperatives are fine only if the context is rich
   (*"Watch out for the ice on the steps — I slipped there this morning."*).
5. **Concrete and vivid**, everyday life: people, places, things the learner can picture. Avoid abstract
   "He did it." sentences, and avoid the cliché "The company…" unless the word is business vocabulary.
6. **The target appears in the sentence**, in any natural form (*forgot*, *is running*, *has been*, *gave it up*).
   For multi-word entries (`chair a meeting`, `fight in the yard`) use the verb and the key words of the expression;
   small changes are fine (*chaired the meeting*). Phrasal verbs may be split (*turn the music down*).
7. **No giveaways that make it trivial in the wrong way:** don't define the word with the word itself
   ("To scrub means to scrub…"), don't use the Ukrainian word in English.
8. **Keep a good existing example.** If `ex` is already 8+ words AND already makes the meaning guessable, you may
   return it unchanged. Usually you should rewrite.
9. **Ukrainian translation (`exUk`)**: natural, idiomatic Ukrainian (not word-for-word), correct grammar and
   apostrophe `ʼ` (U+02BC) like the rest of the data; translate the target with the meaning in `uk`.
   Don't use Russian words or surzhyk.
10. **18+ words** (`adult: true`): keep the meaning clear but tasteful — suggestive, not graphic.
11. Style: American or neutral spelling is fine; use straight apostrophes `'` in English (`don't`), em dash `—`
    with spaces if you need a dash. No emoji. End with `.`, `!` or `?`.

### Second example (`ex2`)

Some items also have `ex2` / `ex2Uk`. Rewrite it by the same rules, as a **different situation** from `ex`
(different people, place, verb form). Return `ex2` + `ex2Uk` only for items that had `ex2`.

### Adjectives (`adjs`) — extra rules

- Use the word **as an adjective**: before a noun (*a **fragile** vase*) or after *be / look / feel / seem / get /
  become* (*the ice looked **thin***). Not as an adverb (*-ly*) or a noun. The exact headword must appear as is
  (a hyphen may be a space: *world class* is fine for `world-class`); comparative / superlative are fine if the
  item has `comp`.
- Good clues for adjectives:
  - consequence: *"The box was so **heavy** that two men had to carry it up the stairs."*
  - evidence / description of what makes it so: *"The soup was **bland** — no salt, no pepper, no taste at all."*
  - contrast or opposite: *"My brother is **outgoing** and talks to everyone, but I'm quiet and shy."*
  - comparison / degree: *"It wasn't just big — the dog was **enormous**, almost as tall as me."*
  - the typical noun from `ctx` in a real situation.
- **Shades matter.** Many adjectives are near-synonyms (*big / huge / enormous*, *pretty / beautiful*, *thin / skinny /
  slim*). The context should show the shade — strength, tone (positive / negative), formality. Read `note`,
  `syn`, `ant` when given.
- If `prep` is given (e.g. `dependent` + `on`), use the adjective with that preposition. `prep` is attached automatically to every word with that spelling, so if it clashes with the meaning in `uk` / `ctx` (e.g. `short` = «низький», but `prep: of` = *short of*), **the meaning wins** — ignore `prep`.

## Input — `tools/examples/batches/<pos>/NNN.json`

`<pos>` is `verbs` or `adjs`. Adjective items may also have `comp` (comparative / superlative), `syn`, `ant`,
`note` (usage nuance), `prep`.

```json
{ "id": 1203, "en": "gloat", "uk": "зловтішатися", "lvl": "C1", "ctx": "", "uCtx": "",
  "topics": "Емоції; …", "ex": "Don't gloat!", "exUk": "Не зловтішайся!" }
```

## Output — `tools/examples/out/<pos>/NNN.json` (same part of speech and file number as the batch)

A JSON array with **one object per input item, same order**:

```json
[
  { "id": 1203, "en": "gloat",
    "ex": "He kept gloating about winning the bet, laughing at everyone who had lost money.",
    "exUk": "Він усе зловтішався, що виграв парі, і сміявся з усіх, хто програв гроші." }
]
```

- `id`, `en` — copied exactly from input.
- `ex`, `exUk` — required. `ex2`, `ex2Uk` — only when the input had `ex2`.

Check your file: `node tools/examples/validate.js <pos> NNN` (e.g. `node tools/examples/validate.js adjs 007`) — fix every error it prints (warnings: look and decide).
