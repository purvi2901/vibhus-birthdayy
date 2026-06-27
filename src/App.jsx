import { useState } from 'react'
import Hero from './components/Hero'
import Wishes from './components/Wishes'
import Gallery from './components/Gallery'
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
  const [confettiOn, setConfettiOn] = useState(false)

  return (
    <div className="app">
      {/* Props look like HTML attributes. Hero receives them as a JS object. */}
      <Hero
        name={BIRTHDAY_INFO.name}
        age={BIRTHDAY_INFO.age}
        date={BIRTHDAY_INFO.date}
        confettiOn={confettiOn}
        onCelebrate={() => setConfettiOn(true)}
      />
      <Wishes name={BIRTHDAY_INFO.name} />
      <Gallery />
    </div>
  )
}

export default App
