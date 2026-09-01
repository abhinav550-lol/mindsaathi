# DementiaCare Game Skill

## Purpose

This skill defines the standard architecture, UI, timing, scoring, lifecycle, and backend result format for every cognitive game in DementiaCare. All games should follow the same structure so they are easier to maintain, compare, and scale.

## Core Rules

Every game should use the shared game engine for common behavior such as:

- Dark UI layout
- Instructions screen
- Timer
- Pause/resume
- Difficulty
- Progress
- Result screen
- Backend submission
- Manual/Auto mode integration

Only the actual game logic and central game area should change between games.

## Folder Structure

```text
games/
├── common/
│   ├── GameLayout.tsx
│   ├── GameHeader.tsx
│   ├── GameTimer.tsx
│   ├── GameInstructions.tsx
│   ├── GameProgress.tsx
│   ├── GameResult.tsx
│   ├── useGameTimer.ts
│   ├── useGameSession.ts
│   └── gameTypes.ts
│
├── CardMatching/
│   ├── CardMatching.tsx
│   ├── gameLogic.ts
│   ├── levels.ts
│   ├── config.ts
│   └── index.ts
│
└── gameRegistry.ts
```

## Standard Game Lifecycle

```text
INSTRUCTIONS
    ↓
READY
    ↓
PLAYING
 ┌──┼────────────┐
 ↓  ↓            ↓
PAUSED       COMPLETED
               │
            TIMEOUT
               │
               ↓
             RESULT
               ↓
       Backend Submission
```

Use common statuses:

```ts
type GameStatus =
  | "INSTRUCTIONS"
  | "READY"
  | "PLAYING"
  | "PAUSED"
  | "COMPLETED"
  | "FAILED"
  | "TIMEOUT"
  | "RESULT";
```

## Common Props

Every game should accept:

```ts
interface GameProps {
  gameId: string;
  difficulty: number;
  mode: "MANUAL" | "AUTO";
  onComplete: (result: GameResult) => void;
  onExit?: () => void;
}
```

## Dark UI Standard

Use the same shadcn/Tailwind dark theme across all games.

Prefer semantic classes:

```text
bg-background
text-foreground
bg-card
text-card-foreground
bg-muted
text-muted-foreground
border-border
bg-primary
```

The layout should contain:

```text
Game Header
Difficulty + Timer + Progress
Main Game Area
Current Instruction
```

Keep the interface elderly-friendly with large text, large touch targets, clear spacing, strong contrast, and minimal animation.

## Timer Mechanism

All games must use a shared `useGameTimer` hook.

The timer starts only after the player presses Start and the READY countdown finishes.

```text
Start
 ↓
3 → 2 → 1
 ↓
PLAYING
 ↓
Timer Starts
```

The shared timer should expose:

```ts
timeRemaining
elapsedTime
start()
pause()
resume()
reset()
```

Paused time should not count toward completion time.

On timeout:

```ts
finishGame("TIMEOUT");
```

Games should not create separate timer implementations.

## Difficulty

Use common difficulty levels:

```text
1 = Very Easy
2 = Easy
3 = Medium
4 = Hard
5 = Very Hard
```

Each game defines its own values inside `levels.ts`, such as number of cards, sequence length, or time limit.

## Standard Result Contract

Every game must return the same result shape:

```ts
interface GameResult {
  gameId: string;
  difficulty: number;
  mode: "MANUAL" | "AUTO";
  status: "COMPLETED" | "FAILED" | "TIMEOUT";
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalAttempts: number;
  totalQuestions: number;
  completionTime: number;
  timeLimit: number;
  hintsUsed: number;
  pauseCount: number;
  startedAt: string;
  completedAt: string;
  metadata?: Record<string, unknown>;
}
```

Use a normalized gameplay score from `0–100`. This is a gameplay performance score, not a medical cognitive score.

## Backend Submission

All results use one endpoint pattern:

```http
POST /api/games/:gameId/sessions
```

All game sessions should be stored in one MongoDB collection:

```text
gameSessions
```

Do not create separate collections for each game.

The backend should validate game ID, difficulty, score, timing, status, and metrics. Patient identity should come from authentication rather than editable frontend payloads.

## Game Responsibility

The shared game engine handles:

```text
Timer
Lifecycle
Pause
Instructions
Result UI
Backend format
Manual/Auto integration
```

Each individual game handles:

```text
Game rules
Game-specific visuals
Correct/incorrect detection
Level configuration
Optional metadata
```

New games should only require a new game folder plus one entry in `gameRegistry.ts`.
