const BUBBLE_COUNT = 20

// Soft bubbles drifting up and spreading out behind the page content.
function Bubbles() {
  return (
    <div className="bubbles" aria-hidden>
      {Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${Math.round((i / BUBBLE_COUNT) * 100) + (i % 3)}%`,
            '--size': `${14 + (i % 5) * 10}px`,
            '--dur': `${10 + (i % 6) * 2.5}s`,
            '--delay': `${i * 0.9}s`,
            '--drift': `${(i % 2 ? 1 : -1) * (25 + (i % 4) * 20)}px`,
          }}
        />
      ))}
    </div>
  )
}

export default Bubbles
