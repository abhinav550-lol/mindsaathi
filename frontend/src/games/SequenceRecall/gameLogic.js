import { levels } from './levels'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function createSequence(level = 1, round = 1) {
  const config = levels[level] ?? levels[1]
  const sequenceLength = config.startingSequenceLength + round - 1
  const sequence = []

  for (let index = 0; index < sequenceLength; index += 1) {
    let nextNumber = randomInt(1, config.tileCount)

    // Avoid immediate repeats where possible. This keeps the demonstration
    // easier to follow without preventing longer sequences at harder levels.
    if (config.tileCount > 1 && nextNumber === sequence[index - 1]) {
      nextNumber = nextNumber === config.tileCount ? 1 : nextNumber + 1
    }

    sequence.push(nextNumber)
  }

  return sequence
}

export function getHintIndexes(sequenceLength, incorrectAttempts) {
  if (sequenceLength <= 0 || incorrectAttempts <= 0) return []
  if (incorrectAttempts === 1) return [0]

  const halfLength = Math.ceil(sequenceLength / 2)
  return Array.from({ length: Math.min(halfLength, sequenceLength) }, (_, index) => index)
}

export function calculateScore({
  roundsCompleted,
  totalRounds,
  incorrectAnswers,
  hintsUsed,
  sequenceReplays,
}) {
  const roundScore = totalRounds > 0 ? (roundsCompleted / totalRounds) * 100 : 0
  const penalty = incorrectAnswers * 3 + hintsUsed * 2 + sequenceReplays

  return Math.max(0, Math.min(100, Math.round(roundScore - penalty)))
}

export function calculateResult({
  difficulty,
  status,
  roundsCompleted,
  totalRounds,
  incorrectAnswers,
  hintsUsed,
  sequenceReplays,
  completionTime,
  timeLimit,
  startedAt,
  completedAt,
  metadata,
}) {
  return {
    gameId: 'sequence-recall',
    difficulty,
    mode: 'standard',
    status,
    completed: status === 'CORRECT',
    score: calculateScore({
      roundsCompleted,
      totalRounds,
      incorrectAnswers,
      hintsUsed,
      sequenceReplays,
    }),
    correctAnswers: roundsCompleted,
    incorrectAnswers,
    totalAttempts: roundsCompleted + incorrectAnswers,
    totalQuestions: totalRounds,
    completionTime,
    timeLimit,
    hintsUsed,
    sequenceReplays,
    roundsCompleted,
    totalRounds,
    startedAt,
    completedAt,
    metadata,
  }
}