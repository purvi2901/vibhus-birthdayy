import Hero from './components/Hero'
import Gallery from './components/Gallery'
import VideoGallery from './components/VideoGallery'
import Slideshow from './components/Slideshow'
import FamilyMoments from './components/FamilyMoments'
import PageBackground from './components/PageBackground'
import Bubbles from './components/Bubbles'
import BirthdayMusic from './components/BirthdayMusic'
import Reveal from './components/Reveal'
import './App.css'

// ✏️ STEP 2: PROPS
// All the "data" about Vaibhavi lives here in one place.
// We pass it DOWN to child components via props.
// This way, if you want to change something, you only change it here!

const BIRTHDAY_INFO = {
  name: 'Vaibhavi',
  age: 1,
  date: 'September 13, 2026',
}

function App() {
  return (
    <div className="app">
      <PageBackground />
      <Bubbles />
      <BirthdayMusic />
      {/* Props look like HTML attributes. Hero receives them as a JS object. */}
      <Hero
        name={BIRTHDAY_INFO.name}
        age={BIRTHDAY_INFO.age}
        date={BIRTHDAY_INFO.date}
      />
      <Reveal><FamilyMoments /></Reveal>
      <Reveal><VideoGallery /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Slideshow /></Reveal>
    </div>
  )
}

export default App
