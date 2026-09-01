function Card({ card, isFaceUp, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`memory-card ${isFaceUp ? 'is-visible' : ''} ${card.matched ? 'is-matched' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={isFaceUp ? `Card showing ${card.value}` : 'Hidden card'}
    >
      <span className="card-inner">
        <span className="card-face card-back">?</span>
        <span className="card-face card-front">{card.value}</span>
      </span>
    </button>
  )
}

export default Card
