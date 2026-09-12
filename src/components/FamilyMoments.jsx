import Reveal from './Reveal'
import momyplaceholder from '../assets/vibhu-photo/MMF_5322.jpg.jpeg'
import papPlaceholder from '../assets/vibhu-photo/MMF_5041.jpg.jpeg'
import purvimasiplaceholder from '../assets/vibhu-photo/20260509_131535.jpg'
import familyPlaceholder from '../assets/vibhu-photo/MMF_5041.jpg.jpeg'
import dharaplaceholder from '../assets/vibhu-photo/IMG-20260621-WA0134.jpg'
import rohitplaceholder from '../assets/vibhu-photo/IMG-20260912-WA0061.jpg'
import ankitaplaceholder from '../assets/vibhu-photo/IMG-20251005-WA0819.jpg'
import jayplaceholder from '../assets/vibhu-photo/IMG-20251005-WA0376.jpg'
import shivuplaceholder from '../assets/vibhu-photo/IMG-20250913-WA0018.jpg'

// 🔧 Swap `photo` for each person once you have a real photo of them with
// Vaibhavi — add an import above and point it here. Names/roles are free
// to rename too.
const FAMILY = [
  { name: 'With Mummy', role: 'Mother', photo: momyplaceholder },
  { name: 'With Shivu', role: 'Brother', photo: shivuplaceholder },
  { name: 'With Papa', role: 'Father', photo: papPlaceholder },
  { name: 'With Ankita Masi', role: 'Aunt', photo: ankitaplaceholder },
  { name: 'With Purvi Masi', role: 'Aunt', photo: purvimasiplaceholder },
  { name: 'With Rohit Mama', role: 'Uncle', photo: rohitplaceholder },
  { name: 'With Dhara Masi', role: 'Aunt', photo: dharaplaceholder },
  { name: 'With masa-masi', role: 'Uncle', photo: jayplaceholder },
]

function FamilyMoments() {
  return (
    <section className="family-moments">
      <h2>Vaibhavi's Family 💞</h2>
      <div className="moments-grid">
        {FAMILY.map((person, index) => (
          <Reveal key={person.name} delay={index * 40}>
            <div className="moment-card">
              <div className="photo-frame">
                <div className="photo-blur" style={{ backgroundImage: `url(${person.photo})` }} />
                <img src={person.photo} alt={person.name} loading="lazy" />
              </div>
              <div className="moment-card-overlay">
                <span className="moment-card-label">{person.name}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default FamilyMoments
