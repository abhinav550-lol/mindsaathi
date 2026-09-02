import CardMatching from './CardMatching'
import OperatorMemory from './OperatorMemory'
import SequenceRecall from './SequenceRecall'

export const gameRegistry = {
  'card-matching': {
    id: 'card-matching',
    name: 'Card Matching',
    ability: 'Visual Memory & Recognition',
    description: 'Flip pairs of visual cards to test and enhance short-term visual memory and focus.',
    icon: '🃏',
    targetArea: 'Visual Memory & Recognition',
    color: 'from-emerald-500 to-teal-700',
    component: CardMatching,
  },
  'operator-memory': {
    id: 'operator-memory',
    name: 'Operator Memory',
    ability: 'Working Memory & Calculation',
    description: 'Recall hidden arithmetic operators to exercise mental calculation and working memory speed.',
    icon: '🔢',
    targetArea: 'Working Memory & Calculation',
    color: 'from-blue-500 to-indigo-700',
    component: OperatorMemory,
  },
  'sequence-recall': {
    id: 'sequence-recall',
    name: 'Sequence Recall',
    ability: 'Sequential Pattern Processing',
    description: 'Watch the flashing pattern sequence and repeat it back step-by-step to boost attention.',
    icon: '🧩',
    targetArea: 'Pattern Processing & Focus',
    color: 'from-amber-500 to-orange-700',
    component: SequenceRecall,
  },
}

export default gameRegistry