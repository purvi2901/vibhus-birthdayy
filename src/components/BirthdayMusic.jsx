import { useEffect, useState } from 'react'
import { toggleUser, getState, subscribe } from '../lib/music'
import { DEFAULT_MUSIC } from '../data/curatedMoments'

function BirthdayMusic() {
  const [{ playing }, setMusicState] = useState(getState())

  useEffect(() => subscribe(setMusicState), [])

  function handleClick() {
    toggleUser(DEFAULT_MUSIC)
    // Read the real state back, so the icon always matches what's playing
    setMusicState(getState())
  }

  return (
    <button
      className={`music-btn ${playing ? 'is-playing' : ''}`}
      onClick={handleClick}
      aria-label={playing ? 'Turn music off' : 'Play music'}
    >
      {playing ? '🎵' : '🔇'}
    </button>
  )
}

export default BirthdayMusic
