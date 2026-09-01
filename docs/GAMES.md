For DementiaCare, I’d keep every cognitive game **independent**, but make all of them follow the same interface so Auto Mode, scoring, timers, and backend submission work identically.

### Game folder structure

```text
frontend/
└── src/
    └── games/
        │
        ├── common/
        │   ├── GameLayout.jsx
        │   ├── GameHeader.jsx
        │   ├── GameTimer.jsx
        │   ├── GameInstructions.jsx
        │   ├── GameResult.jsx
        │   └── gameUtils.js
        │
        ├── CardMatching/
        │   ├── CardMatching.jsx
        │   ├── Card.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        ├── SequenceMemory/
        │   ├── SequenceMemory.jsx
        │   ├── SequenceTile.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        ├── ObjectRecall/
        │   ├── ObjectRecall.jsx
        │   ├── ObjectCard.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        ├── WordMatching/
        │   ├── WordMatching.jsx
        │   ├── WordCard.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        ├── PatternMemory/
        │   ├── PatternMemory.jsx
        │   ├── PatternGrid.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        ├── NumberMemory/
        │   ├── NumberMemory.jsx
        │   ├── NumberDisplay.jsx
        │   ├── gameLogic.js
        │   ├── levels.js
        │   └── index.js
        │
        └── gameRegistry.js
```

### What each game contains

For example:

```text
CardMatching/
├── CardMatching.jsx   → Main game component
├── Card.jsx           → Game-specific UI component
├── gameLogic.js       → Matching/scoring/game logic
├── levels.js          → Difficulty configuration
└── index.js           → Export
```

Keep **difficulty configuration outside the React component**.

For example:

```js
// levels.js

export const levels = {
  1: {
    pairs: 3,
    timeLimit: 120,
  },

  2: {
    pairs: 4,
    timeLimit: 100,
  },

  3: {
    pairs: 6,
    timeLimit: 90,
  },

  4: {
    pairs: 8,
    timeLimit: 80,
  },

  5: {
    pairs: 10,
    timeLimit: 70,
  },
}
```

Those numbers are just an implementation example—you should tune them through testing with your target users rather than treating them as fixed cognitive benchmarks.

### Common game lifecycle

Every game should follow the same basic lifecycle:

```text
             Game Selected
                   │
                   ▼
           Load Difficulty
                   │
                   ▼
             Instructions
                   │
                   ▼
              Start Game
                   │
             Start Timer
                   │
                   ▼
                Playing
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
      Completed         Time Limit
          │                 │
          └────────┬────────┘
                   ▼
             Calculate Result
                   │
                   ▼
             Submit Result
                   │
                   ▼
               Backend
                   │
                   ▼
             GameSession
                   │
            ┌──────┴───────┐
            ▼              ▼
       Manual Mode      Auto Mode
            │              │
            ▼              ▼
        Game List      Next Game
```

### Standard result format

This part is important. **All six games should return the same result structure.**

```js
{
  gameId: "card-matching",

  difficulty: 2,

  score: 82,

  correctAnswers: 8,
  totalQuestions: 10,

  completionTime: 67,

  completed: true
}
```

Then your frontend doesn't care whether the patient played Card Matching, Number Memory, or Pattern Memory.

It simply does:

```js
await submitGameResult(result)
```

and your backend handles the rest.

### `gameRegistry.js`

I strongly recommend this because it will make your **Manual Mode and Auto Mode much easier**.

```js
import CardMatching from "./CardMatching"
import SequenceMemory from "./SequenceMemory"
import ObjectRecall from "./ObjectRecall"
import WordMatching from "./WordMatching"
import PatternMemory from "./PatternMemory"
import NumberMemory from "./NumberMemory"

export const gameRegistry = {
  "card-matching": {
    name: "Card Matching",
    component: CardMatching,
  },

  "sequence-memory": {
    name: "Sequence Memory",
    component: SequenceMemory,
  },

  "object-recall": {
    name: "Object Recall",
    component: ObjectRecall,
  },

  "word-matching": {
    name: "Word Matching",
    component: WordMatching,
  },

  "pattern-memory": {
    name: "Pattern Memory",
    component: PatternMemory,
  },

  "number-memory": {
    name: "Number Memory",
    component: NumberMemory,
  },
}
```

Then your `GamePlay` page can dynamically load games instead of having six separate routes full of duplicated logic:

```text
/patient/games/card-matching
/patient/games/sequence-memory
/patient/games/object-recall
```

Conceptually:

```js
const game = gameRegistry[gameId]
const GameComponent = game.component

return (
  <GameComponent
    difficulty={difficulty}
    onComplete={handleGameComplete}
  />
)
```

This gives you a clean separation:

```text
GamePlay Page
     │
     ├── Game Registry
     │       │
     │       ├── Card Matching
     │       ├── Sequence Memory
     │       ├── Object Recall
     │       ├── Word Matching
     │       ├── Pattern Memory
     │       └── Number Memory
     │
     └── Common System
             ├── Timer
             ├── Results
             ├── Backend submission
             ├── Manual Mode
             └── Auto Mode
```

That structure is especially useful for your project because later you can add a seventh game by creating **one new game folder + one registry entry**, without changing the overall game system.
