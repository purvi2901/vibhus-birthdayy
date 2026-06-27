import { useState, useEffect } from 'react'

// ✏️ STEP 5: useEffect + localStorage
// useEffect runs code AFTER React renders the component.
// localStorage is the browser's built-in storage — data stays
// even after you close the tab or refresh the page!

const WISHES = [
  { id: 1, from: 'Mummy', message: 'You are my whole world, little one. 💕' },
  { id: 2, from: 'Papa', message: 'Every day with you is a gift. We love you! 🌟' },
  { id: 3, from: 'Purvi Masi', message: 'My favourite little munchkin — happy 1st birthday! 🎉' },
  { id: 4, from: 'Dadi', message: 'May you always smile as bright as the sun. 🌞' },
  { id: 5, from: 'Nana-Nani', message: 'Our precious angel, we are so proud of you! 👼' },
  { id: 6, from: 'Ankita Masi', message: 'One year of magic — here is to many more! ✨' },
]

// Build a default counts object: { 1: 0, 2: 0, 3: 0, ... }
const DEFAULT_COUNTS = Object.fromEntries(WISHES.map(w => [w.id, 0]))

function WishCard({ wish }) {
  return (
    <div className="wish-card">
      <p className="wish-message">"{wish.message}"</p>
      <p className="wish-from">— {wish.from}</p>
    </div>
  )
}

function Wishes({ name }) {
  // Load saved counts from localStorage on first render,
  // or use all-zeros if nothing saved yet
  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem('vaibhavi-likes')
    return saved ? JSON.parse(saved) : DEFAULT_COUNTS
  })

  // useEffect runs every time "counts" changes.
  // It saves the latest counts to localStorage automatically.
  // The [counts] at the end is the "dependency array" —
  // React only re-runs this effect when counts changes.
  useEffect(() => {
    localStorage.setItem('vaibhavi-likes', JSON.stringify(counts))
  }, [counts])

  function handleLike(id) {
    // Create a new object with the count for this id incremented
    setCounts(prev => ({ ...prev, [id]: prev[id] + 1 }))
  }

  return (
    <section className="wishes">
      <h2>Wishes for {name} 💌</h2>
      <div className="wishes-grid">
        {WISHES.map(wish => (
          <div key={wish.id} className="wish-wrapper">
            <WishCard wish={wish} />
            <button
              className="like-btn"
              onClick={() => handleLike(wish.id)}
            >
              ❤️ {counts[wish.id]} {counts[wish.id] === 1 ? 'Like' : 'Likes'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Wishes
