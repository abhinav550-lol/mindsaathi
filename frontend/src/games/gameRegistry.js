import CardMatching from './CardMatching'
import OperatorMemory from './OperatorMemory'
import SequenceRecall from './SequenceRecall'

export const gameRegistry = {
  'card-matching': {
    name: 'Card Matching',
    component: CardMatching,
  },
  'operator-memory': {
    name: 'Operator Memory',
    component: OperatorMemory,
  },
  'sequence-recall': {
    name: 'Sequence Recall',
    component: SequenceRecall,
  },
}

export default gameRegistry