function SequenceTile({ number, isHighlighted, isSelected, selectedOrder, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`sequence-tile ${isHighlighted ? 'is-highlighted' : ''} ${
        isSelected ? 'is-selected' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Number ${number}${isSelected ? `, selected ${selectedOrder}` : ''}`}
    >
      <span className="sequence-tile-number">{number}</span>
      {isSelected ? <span className="sequence-tile-order">{selectedOrder}</span> : null}
    </button>
  )
}

export default SequenceTile