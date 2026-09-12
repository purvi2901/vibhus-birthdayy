import Reveal from './Reveal'
import { MOMENTS } from '../data/curatedMoments'

// Everything in curatedMoments.js, shown as a static grid, no click-to-enlarge.
const ALL_PHOTOS = MOMENTS.map(moment => ({ id: moment.label, url: moment.photo, caption: moment.label }))

function Gallery() {
  return (
    <section className="gallery">
      <h2>A Year in Pictures 📽️</h2>

      <div className="gallery-grid">
        {ALL_PHOTOS.map((photo, index) => (
          <Reveal key={photo.id} delay={(index % 12) * 30}>
            <div className="gallery-item">
              {/* Blurred copy of the same photo fills the frame, so the real
                  photo can show in full without being cropped */}
              <div className="photo-frame">
                <div className="photo-blur" style={{ backgroundImage: `url(${photo.url})` }} />
                <img src={photo.url} alt={photo.caption} loading="lazy" />
              </div>
              <p className="gallery-caption">{photo.caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Gallery
