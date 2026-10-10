# New dictionary entries from Oxford 3000/5000 — how to write them

EngLift is an offline English-learning app for **Ukrainian speakers**. Its dictionary has verbs, nouns, adjectives
and adverbs, each with a Ukrainian translation, IPA, CEFR level, emoji, topic categories and one example sentence.
We compared it with the Oxford 3000/5000 lists and found important words that are missing — even A1 words like
*want, door, busy, ago*. Your job: write a **complete dictionary entry** for every word in your batch.

## Input — `tools/oxford/batches/<pos>/NNN.json`

```json
{ "key": "verbs|bring", "en": "bring", "lvl": "A1", "list": "Oxford 3000",
  "alreadyInApp": ["nouns: …"], "inPhrases": ["bring up", "bring flowers"] }
```

- `key` — copy it exactly. `lvl` — the Oxford level; copy it exactly.
- `alreadyInApp` — the same spelling already exists in the app as **another part of speech** (or same one with
  another meaning). Your entry must be the meaning that is missing — not a duplicate of these.
- `inPhrases` — the word exists only inside longer expressions (phrasal verbs, collocations). Write the plain,
  most common meaning of the word itself (*bring* = приносити), not the phrase.

## Output — `tools/oxford/out/<pos>/NNN.json` (same part of speech and file number)

A JSON array, **one object per input item, same order**. Write it with the Write tool (UTF-8).

### Common fields (all parts of speech)

| field | rule |
|---|---|
| `key` | copied from input |
| `en` | the headword exactly as in input (American spelling as Oxford gives it) |
| `uk` | short Ukrainian translation of the **most common meaning at this CEFR level**; two close synonyms may be joined with ` / ` (*йти / їхати*). Use the Ukrainian apostrophe `ʼ` (U+02BC). No Russian words, no surzhyk. |
| `ipa` | IPA in slashes, the same style as the rest of the dictionary (British RP like Oxford/Cambridge learner's dictionaries): `/brɪŋ/`, `/ɡəʊ/`, `/ˈwɔːtə/` |
| `emoji` | one emoji that helps remember the meaning |
| `lvl` | copied from input |
| `cats` | topic ids from `tools/oxford/catalog/<pos>.md`: the category id followed by one of its subcategory ids — `["basic_v", "core_actions"]`. Up to two pairs if the word clearly fits two topics (`["food", "cooking", "kitchen", "prepping"]`). Use a category alone only if it has no subcategories. Prefer an existing topic when it fits well; the 🆕 categories exist for words that fit nowhere else (basic/general words, society, science, business, formal/academic vocabulary). Never use adult categories. |
| `ctx`, `uCtx` | optional: a typical short partner phrase in English and its Ukrainian version, shown next to the word on the card — *bring* `ctx: "an umbrella"`, `uCtx: "парасольку"`; *busy* `ctx: "day"`, `uCtx: "день"`. Use when it makes the meaning clearer; omit otherwise. |
| `ex`, `exUk` | one example sentence + Ukrainian translation — follow **`tools/examples/SPEC.md`** exactly (8–18 words, the context lets a learner guess the meaning, easy words around the target, natural Ukrainian with ʼ). This is the most important field. |
| `reg2` | optional: `"formal"` or `"casual"` when the word clearly belongs to one register |
| `note` | optional, rarely: one short usage tip in English or Ukrainian (a typical mistake, a false friend, AmE vs BrE) |

### Per part of speech

- **verbs**: irregular verbs get `"past"`, `"pp"` and `"reg": false` (*bring*: `"past": "brought", "pp": "brought"`;
  several forms with `/`: `"past": "dreamed/dreamt"`). Regular verbs: omit all three. `born` is a special case —
  write the entry for *be born* (`"en": "born"` stays, `uk: "народитися"`, sentence with *was born*).
- **nouns**: `"cu": "C"` (countable) or `"U"` (uncountable), as the noun is used in this meaning. Plural-only nouns
  (*goods, remains, odds*): omit `cu` and add `"note": "plural only"`. Irregular plurals: `"plural": "people"`.
  The example sentence must show countability (see the nouns section of `tools/examples/SPEC.md`).
- **adjs**: gradable adjectives get `"comp"` and `"sup"` (`"busier"/"busiest"`, `"more serious"/"most serious"`,
  `"better"/"best"`); non-gradable ones (*dead, digital, nuclear, eastern*) get `"grad": false` instead.
  Optional `"syn"` / `"ant"`: a short comma-separated list of common synonyms / antonyms.
- **advs**: optional `"syn"` / `"ant"` like adjectives.

### Skipping

If an item is not worth a separate card, return `{ "key": "...", "skip": "reason" }` instead. Valid reasons:
- the word is a parsing artefact or not a real headword for this part of speech;
- its meaning here is **the same** as an existing card in `alreadyInApp` and a separate card would teach nothing
  new — typically colour nouns (*red* n. = the colour), *now* n., numbers/ordinals already covered.
Do not skip just because the word is easy, or because it exists in `inPhrases`. Skips should be rare.

## Example (verbs)

```json
[
  { "key": "verbs|bring", "en": "bring", "uk": "приносити / привозити", "ipa": "/brɪŋ/", "emoji": "🎁", "lvl": "A1",
    "cats": ["basic_v", "core_actions", "give", "giving"], "ctx": "an umbrella", "uCtx": "парасольку",
    "past": "brought", "pp": "brought", "reg": false,
    "ex": "It's going to rain this afternoon, so bring an umbrella when you come to visit us.",
    "exUk": "Сьогодні по обіді буде дощ, тож принеси парасольку, коли прийдеш до нас у гості." }
]
```

Check your file: `node tools/oxford/validate.js <pos> NNN` — fix every ✗ error, review ⚠ warnings.
