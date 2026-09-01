// Gameplay difficulty settings only.
// These are NOT medical or cognitive diagnostic benchmarks.

export const levels = {
  1: {
    numberCount: 3,
    operators: ['+', '-'],
    minNumber: 1,
    maxNumber: 9,
    timeLimit: 90,
    avoidNegative: true,
  },
  2: {
    numberCount: 4,
    operators: ['+', '-'],
    minNumber: 1,
    maxNumber: 9,
    timeLimit: 90,
    avoidNegative: true,
  },
  3: {
    numberCount: 4,
    operators: ['+', '-', '*'],
    minNumber: 1,
    maxNumber: 9,
    timeLimit: 80,
    avoidNegative: true,
  },
  4: {
    numberCount: 5,
    operators: ['+', '-', '*'],
    minNumber: 1,
    maxNumber: 9,
    timeLimit: 75,
    avoidNegative: true,
  },
  5: {
    numberCount: 5,
    operators: ['+', '-', '*', '/'],
    minNumber: 1,
    maxNumber: 9,
    timeLimit: 70,
    avoidNegative: true,
  },
}
