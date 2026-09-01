// Expression generation, safe arithmetic evaluation, hint logic, and scoring
// for the Operator Memory game. No eval() is used anywhere in this file.

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickOperator(allowedOperators) {
  return allowedOperators[randomInt(0, allowedOperators.length - 1)]
}

/**
 * Evaluates numbers/operators respecting normal arithmetic precedence
 * (* and / before + and -), without using eval().
 *
 * Example: evaluateExpression([3, 4, 5, 3], ['+', '+', '*']) === 22
 */
export function evaluateExpression(numbers, operators) {
  if (!Array.isArray(numbers) || numbers.length === 0) return NaN
  if (operators.length !== numbers.length - 1) return NaN

  // Pass 1: resolve all * and / left-to-right, collapsing them into a
  // running list of values joined only by + and -.
  const stageNumbers = [numbers[0]]
  const stageOperators = []

  operators.forEach((operator, index) => {
    const nextNumber = numbers[index + 1]

    if (operator === '*' || operator === '/') {
      const previous = stageNumbers.pop()
      const combined = operator === '*' ? previous * nextNumber : previous / nextNumber
      stageNumbers.push(combined)
    } else {
      stageOperators.push(operator)
      stageNumbers.push(nextNumber)
    }
  })

  // Pass 2: resolve remaining + and - left-to-right.
  let total = stageNumbers[0]
  stageOperators.forEach((operator, index) => {
    const nextValue = stageNumbers[index + 1]
    total = operator === '+' ? total + nextValue : total - nextValue
  })

  return total
}

/**
 * Generates a random arithmetic expression for a given level config.
 * Retries internally to avoid divide-by-zero, non-integer answers,
 * overly large answers, and (optionally) negative answers. Falls back
 * to a guaranteed-safe +/- only expression if it can't find a clean
 * one quickly, so this function always terminates.
 */
export function generateExpression(levelConfig, attempt = 0) {
  const { numberCount, operators: allowedOperators, minNumber = 1, maxNumber = 9, avoidNegative = true } =
    levelConfig

  const numbers = []
  for (let i = 0; i < numberCount; i += 1) {
    numbers.push(randomInt(minNumber, maxNumber))
  }

  const operators = []
  for (let i = 0; i < numberCount - 1; i += 1) {
    operators.push(pickOperator(allowedOperators))
  }

  // Never allow division by zero.
  operators.forEach((operator, index) => {
    if (operator === '/' && numbers[index + 1] === 0) {
      numbers[index + 1] = randomInt(2, Math.max(2, maxNumber))
    }
  })

  const MAX_ATTEMPTS = 30

  if (attempt >= MAX_ATTEMPTS) {
    // Guaranteed-safe fallback: no multiply/divide, so the result is
    // always a clean integer. Still respects avoidNegative if possible.
    const safeOperators = operators.map((operator) => (operator === '/' || operator === '*' ? '+' : operator))
    let safeAnswer = evaluateExpression(numbers, safeOperators)

    if (avoidNegative && safeAnswer < 0) {
      const positiveOperators = safeOperators.map(() => '+')
      safeAnswer = evaluateExpression(numbers, positiveOperators)
      return { numbers, operators: positiveOperators, answer: safeAnswer }
    }

    return { numbers, operators: safeOperators, answer: safeAnswer }
  }

  const answer = evaluateExpression(numbers, operators)

  const isMessy =
    !Number.isFinite(answer) ||
    !Number.isInteger(answer) ||
    Math.abs(answer) > 999 ||
    (avoidNegative && answer < 0)

  if (isMessy) {
    return generateExpression(levelConfig, attempt + 1)
  }

  return { numbers, operators, answer }
}

/**
 * Reveals the next hidden operator, scanning left to right.
 * `revealedIndexes` is an array of operator indexes already revealed.
 * Returns a new array (does not mutate the input).
 */
export function revealNextOperator(operators, revealedIndexes) {
  const nextIndex = operators.findIndex((_, index) => !revealedIndexes.includes(index))

  if (nextIndex === -1) return revealedIndexes

  return [...revealedIndexes, nextIndex]
}

/**
 * Gameplay score only (0-100). Not a medical or cognitive score.
 */
export function calculateScore({ hintsUsed, incorrectAnswers }) {
  const score = 100 - hintsUsed * 10 - incorrectAnswers * 5
  return Math.max(0, Math.min(100, score))
}

/**
 * Builds the round result in the same general shape the existing game
 * system expects (see CardMatching's calculateResult), extended with
 * Operator Memory specific fields.
 */
export function calculateResult({
  difficulty,
  status,
  correctAnswers,
  incorrectAnswers,
  hintsUsed,
  completionTime,
  timeLimit,
  startedAt,
  completedAt,
  metadata,
}) {
  const score = calculateScore({ hintsUsed, incorrectAnswers })

  return {
    gameId: 'operator-memory',
    difficulty,
    mode: 'standard',
    status,
    completed: status === 'CORRECT',
    score,
    correctAnswers,
    incorrectAnswers,
    totalAttempts: correctAnswers + incorrectAnswers,
    completionTime,
    timeLimit,
    hintsUsed,
    startedAt,
    completedAt,
    metadata,
  }
}
