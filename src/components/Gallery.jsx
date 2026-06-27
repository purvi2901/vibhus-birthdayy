import { useState } from 'react'

// ✏️ STEP 4: LISTS & .map()
// .map() turns an ARRAY OF DATA into an ARRAY OF JSX.
// React renders the JSX array as a list of elements on screen.
// Every item needs a unique "key" prop — React uses it to track
// which items changed/moved/were added without re-rendering everything.

const PHOTOS = [
  { id: 1,  url: 'https://picsum.photos/seed/baby01/400/400', caption: 'Day 1 🌸' },
  { id: 2,  url: 'https://picsum.photos/seed/baby02/400/400', caption: 'First smile 😊' },
  { id: 3,  url: 'https://picsum.photos/seed/baby03/400/400', caption: 'Bath time 🛁' },
  { id: 4,  url: 'https://picsum.photos/seed/baby04/400/400', caption: 'First outing 🌳' },
  { id: 5,  url: 'https://picsum.photos/seed/baby05/400/400', caption: 'With Mamma 💕' },
  { id: 6,  url: 'https://picsum.photos/seed/baby06/400/400', caption: 'With Papa 🤗' },
  { id: 7,  url: 'https://picsum.photos/seed/baby07/400/400', caption: 'First solid food 🥣' },
  { id: 8,  url: 'https://picsum.photos/seed/baby08/400/400', caption: 'Learning to sit 👶' },
  { id: 9,  url: 'https://picsum.photos/seed/baby09/400/400', caption: 'First crawl 🐛' },
  { id: 10, url: 'https://picsum.photos/seed/baby10/400/400', caption: 'Festival fun 🪔' },
  { id: 11, url: 'https://picsum.photos/seed/baby11/400/400', caption: 'Playtime 🧸' },
  { id: 12, url: 'https://picsum.photos/seed/baby12/400/400', caption: 'Almost 1! 🎂' },
]

function Gallery() {
  // null = no photo selected (lightbox closed)
  const [selected, setSelected] = useState(null)

  return (
    <section className="gallery">
      <h2>Vaibhavi's First Year 📸</h2>

      <div className="gallery-grid">
        {/* .map() — one <div> per photo, automatically */}
        {PHOTOS.map(photo => (
          // key={photo.id} is REQUIRED when rendering lists in React
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => setSelected(photo)}  // save the clicked photo in state
          >
            <img src={photo.url} alt={photo.caption} />
            <p className="gallery-caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Conditional render: lightbox only appears when a photo is selected */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          {/* e.stopPropagation() stops the click from bubbling up to the
              overlay and closing the lightbox when you click the image */}
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selected.url} alt={selected.caption} />
            <p>{selected.caption}</p>
            <button onClick={() => setSelected(null)}>✕ Close</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
