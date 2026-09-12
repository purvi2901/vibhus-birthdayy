import { useEffect, useState } from 'react'

const SLIDE_MS = 3800

// Every photo in src/assets/images shows up here automatically —
// drop one in or take one out and the slideshow follows.
const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const PHOTOS = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ id: path, url }))

function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || PHOTOS.length === 0) return
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % PHOTOS.length)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [paused])

  if (PHOTOS.length === 0) return null

  const go = step => setCurrent(i => (i + step + PHOTOS.length) % PHOTOS.length)

  return (
    <section className="slideshow">
      <h2>Vaibhavi's Memories 📸</h2>
      <div
        className="slide-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className="slide-nav" onClick={() => go(-1)} aria-label="Previous photo">‹</button>

        <div className="slide-frame">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className={`slide ${i === current ? 'is-active' : ''}`}
              aria-hidden={i !== current}
            >
              <div className="slide-blur" style={{ backgroundImage: `url(${photo.url})` }} />
              <img src={photo.url} alt="Vaibhavi" loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>

        <button className="slide-nav" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>

      <div className="slide-dots">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.id}
            className={`slide-dot ${i === current ? 'is-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Slideshow
