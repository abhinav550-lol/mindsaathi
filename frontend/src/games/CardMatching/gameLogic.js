import { levels } from './levels'

const symbolPool = ['🍉', '🍋', '🍊', '🍇', '🍓', '🍒', '🍎', '🥝', '🥥', '🍍', '🍑', '🍏']

export function shuffleCards(items) {
  const array = [...items]

  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[array[index], array[randomIndex]] = [array[randomIndex], array[index]]
  }

  return array
}

export function createDeck(level = 1) {
  const config = levels[level] ?? levels[1]
  const symbols = symbolPool.slice(0, config.pairs)

  const deck = symbols.flatMap((symbol, symbolIndex) => {
    const firstCard = {
      id: `${symbol}-pair-${symbolIndex}-a`,
      value: symbol,
      matched: false,
    }

    const secondCard = {
      id: `${symbol}-pair-${symbolIndex}-b`,
      value: symbol,
      matched: false,
    }

    return [firstCard, secondCard]
  })

  return shuffleCards(deck)
}

export function calculateResult({ difficulty, matches, totalPairs, completionTime, completed }) {
  const scoreFromMatches = (matches / totalPairs) * 100
  const timeBonus = Math.max(0, 1 - completionTime / 90) * 25
  const score = Math.min(100, Math.round(scoreFromMatches + timeBonus))

  return {
    gameId: 'card-matching',
    difficulty,
    score,
    correctAnswers: matches,
    totalQuestions: totalPairs,
    completionTime,
    completed,
  }
}
