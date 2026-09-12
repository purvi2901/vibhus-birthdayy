import { useEffect, useState } from 'react'
import sidePhotoLeft from '../assets/MMF_5007.jpg.jpeg'
import sidePhotoRight from '../assets/MMF_5010.jpg.jpeg'

// ✏️ STEP 2: PROPS
// Hero RECEIVES props from App — it doesn't own this data.
// The { } destructuring unpacks each prop by name.

const PETALS = ['🌸', '🌺', '🌼', '🌷', '💮']
const PETAL_COUNT = 12
const BURST_MS = 3800

const BIRTHDAY = new Date('2026-09-13T00:00:00')

function getTimeLeft() {
  const diff = BIRTHDAY - new Date()
  if (diff <= 0) return null // birthday has arrived!

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function Hero({ name, age, date }) {
  // Plays the confetti + cracker burst automatically on page load,
  // then settles down (the falling petals keep drifting gently after).
  const [showBurst, setShowBurst] = useState(true)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => setShowBurst(false), BURST_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      {showBurst && (
        <>
          <div className="confetti-banner">
            🎊 Happy 1st Birthday Vaibhavi! 🎊
          </div>
          <div className="hero-confetti" aria-hidden>
            <span className="confetti-dot" style={{'--i':0}}>🎉</span>
            <span className="confetti-dot" style={{'--i':1}}>🎈</span>
            <span className="confetti-dot" style={{'--i':2}}>✨</span>
            <span className="confetti-dot" style={{'--i':3}}>🌟</span>
            <span className="confetti-dot" style={{'--i':4}}>🎀</span>
            <span className="confetti-dot" style={{'--i':5}}>🎉</span>
          </div>
          <div className="crackers" aria-hidden>
            <span className="cracker" style={{ '--delay': '0s', left: '12%', top: '12%' }}>🎆</span>
            <span className="cracker" style={{ '--delay': '0.3s', left: '78%', top: '18%' }}>🎇</span>
            <span className="cracker" style={{ '--delay': '0.6s', left: '45%', top: '6%' }}>🧨</span>
            <span className="cracker" style={{ '--delay': '0.9s', left: '25%', top: '30%' }}>✨</span>
          </div>
        </>
      )}

      <div className="petals" aria-hidden>
        {Array.from({ length: PETAL_COUNT }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${Math.round((i / PETAL_COUNT) * 100)}%`,
              '--dur': `${6 + (i % 5)}s`,
              '--delay': `${i * 0.4}s`,
            }}
          >
            {PETALS[i % PETALS.length]}
          </span>
        ))}
      </div>

      <div className="balloons">
        <span className="balloon" style={{ '--delay': '0s' }}>🎈</span>
        <span className="balloon" style={{ '--delay': '0.3s' }}>🎀</span>
        <span className="balloon" style={{ '--delay': '0.6s' }}>🎈</span>
        <span className="balloon" style={{ '--delay': '0.9s' }}>🌸</span>
        <span className="balloon" style={{ '--delay': '1.2s' }}>🎈</span>
      </div>

      <div className="hero-row">
        <div className="hero-side hero-side-left">
          <img src={sidePhotoLeft} alt="Vaibhavi" />
        </div>

        <div className="hero-card">
          <div className="hero-content">
            <span className="card-sparkle card-sparkle-1" aria-hidden>✨</span>
            <span className="card-sparkle card-sparkle-2" aria-hidden>💫</span>
            <span className="card-sparkle card-sparkle-3" aria-hidden>⭐</span>

            <div className="hero-avatar">
              <img src={sidePhotoRight} alt={name} />
              <span className="hero-avatar-badge">{age}</span>
            </div>
            <p className="subtitle">✨ Celebrating ✨</p>
            {/* {name} inserts the prop value into the JSX */}
            <h1 className="birthday-name">{name}</h1>
            <p className="age-badge">Turns {age} on {date} 🎂</p>
            <p className="baby-note">One whole year of joy, giggles & love 🥹</p>

            {timeLeft ? (
              <div className="countdown-grid">
                <div className="countdown-box">
                  <span className="countdown-number">{timeLeft.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-number">{timeLeft.hours}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-number">{timeLeft.minutes}</span>
                  <span className="countdown-label">Minutes</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-number">{timeLeft.seconds}</span>
                  <span className="countdown-label">Seconds</span>
                </div>
              </div>
            ) : (
              <div className="arrived-block">
                <div className="arrived-cake">🎂</div>
                <h2 className="arrived-title">Vaibhavi is ONE today!</h2>
                <p className="arrived-sub">Happy 1st Birthday, our little star! 🎉🎊🥳</p>
              </div>
            )}
          </div>
        </div>

        <div className="hero-side hero-side-right">
          <img src={sidePhotoRight} alt="Vaibhavi" />
        </div>
      </div>
    </section>
  )
}

export default Hero
