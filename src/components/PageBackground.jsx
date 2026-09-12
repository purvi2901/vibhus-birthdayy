import { useEffect, useState } from 'react'
import p1 from '../assets/MMF_4978.jpg.jpeg'
import p2 from '../assets/MMF_5007.jpg.jpeg'
import p3 from '../assets/MMF_5010.jpg.jpeg'
import p4 from '../assets/vibhu-photo/MMF_5041.jpg.jpeg'
import p5 from '../assets/vibhu-photo/MMF_5307.jpg.jpeg'
import p6 from '../assets/vibhu-photo/MMF_5322.jpg.jpeg'

const SLIDES = [p1, p2, p3, p4, p5, p6]
const SLIDE_MS = 6000

// A slow crossfade slideshow that lives fixed behind the whole page.
// A soft light wash is baked into each slide's background so page
// text stays readable no matter which photo is showing.
function PageBackground() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-bg" aria-hidden>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`page-bg-slide ${i === index ? 'is-active' : ''}`}
          style={{
            backgroundImage: `linear-gradient(rgba(255,246,251,0.62), rgba(240,248,255,0.66)), url(${src})`,
          }}
        />
      ))}
    </div>
  )
}

export default PageBackground
