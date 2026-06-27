// ✏️ STEP 2: PROPS
// Hero RECEIVES props from App — it doesn't own this data.
// The { } destructuring unpacks each prop by name.
// Try adding a new prop in App.jsx and using it here!

function Hero({ name, age, date, confettiOn, onCelebrate }) {
  return (
    <section className="hero">
      {confettiOn && (
        <div className="confetti-banner">
          🎊 Happy 1st Birthday Vaibhavi! 🎊
        </div>
      )}

      <div className="balloons">
        <span className="balloon" style={{ '--delay': '0s' }}>🎈</span>
        <span className="balloon" style={{ '--delay': '0.3s' }}>🎀</span>
        <span className="balloon" style={{ '--delay': '0.6s' }}>🎈</span>
        <span className="balloon" style={{ '--delay': '0.9s' }}>🌸</span>
        <span className="balloon" style={{ '--delay': '1.2s' }}>🎈</span>
      </div>

      <div className="hero-content">
        <p className="subtitle">✨ Celebrating ✨</p>
        {/* {name} inserts the prop value into the JSX */}
        <h1 className="birthday-name">{name}</h1>
        <p className="age-badge">Turns {age} on {date} 🎂</p>
        <p className="baby-note">One whole year of joy, giggles & love 🥹</p>

        <button className="celebrate-btn" onClick={onCelebrate}>
          🎉 Celebrate!
        </button>
      </div>
    </section>
  )
}

export default Hero
