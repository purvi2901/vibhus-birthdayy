// Cute tunes played with the Web Audio API — no audio files needed.
// Lives outside React so the toggle button and the video section can both
// drive the same music.

const N = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00,
  B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
}

// [frequency, beats] — null frequency is a rest
export const TUNES = {
  birthday: {
    name: 'Happy Birthday 🎂',
    beat: 0.42,
    notes: [
      [N.G4, 0.5], [N.G4, 0.5], [N.A4, 1], [N.G4, 1], [N.C5, 1], [N.B4, 2], [null, 0.5],
      [N.G4, 0.5], [N.G4, 0.5], [N.A4, 1], [N.G4, 1], [N.D5, 1], [N.C5, 2], [null, 0.5],
      [N.G4, 0.5], [N.G4, 0.5], [N.G5, 1], [N.E5, 1], [N.C5, 1], [N.B4, 1], [N.A4, 2],
      [N.F5, 0.5], [N.F5, 0.5], [N.E5, 1], [N.C5, 1], [N.D5, 1], [N.C5, 3], [null, 2],
    ],
  },
  twinkle: {
    name: 'Twinkle Twinkle ⭐',
    beat: 0.40,
    notes: [
      [N.C4, 1], [N.C4, 1], [N.G4, 1], [N.G4, 1], [N.A4, 1], [N.A4, 1], [N.G4, 2],
      [N.F4, 1], [N.F4, 1], [N.E4, 1], [N.E4, 1], [N.D4, 1], [N.D4, 1], [N.C4, 2],
      [N.G4, 1], [N.G4, 1], [N.F4, 1], [N.F4, 1], [N.E4, 1], [N.E4, 1], [N.D4, 2],
      [N.G4, 1], [N.G4, 1], [N.F4, 1], [N.F4, 1], [N.E4, 1], [N.E4, 1], [N.D4, 2],
      [N.C4, 1], [N.C4, 1], [N.G4, 1], [N.G4, 1], [N.A4, 1], [N.A4, 1], [N.G4, 2],
      [N.F4, 1], [N.F4, 1], [N.E4, 1], [N.E4, 1], [N.D4, 1], [N.D4, 1], [N.C4, 3], [null, 1.5],
    ],
  },
  soft: {
    name: 'Soft & Dreamy 🕊️',
    beat: 0.6,
    notes: [
      [N.C5, 1.5], [N.A4, 1], [N.G4, 1.5], [N.E4, 2], [null, 0.5],
      [N.G4, 1], [N.A4, 1], [N.C5, 1.5], [N.A4, 2], [null, 0.5],
      [N.E5, 1.5], [N.D5, 1], [N.C5, 1.5], [N.A4, 2], [null, 0.5],
      [N.G4, 1], [N.E4, 1], [N.G4, 1.5], [N.C5, 2.5], [null, 1.5],
    ],
  },
  lullaby: {
    name: 'Sweet Lullaby 🌙',
    beat: 0.55,
    notes: [
      [N.E4, 0.5], [N.E4, 0.5], [N.G4, 1.5], [N.E4, 0.5], [N.E4, 0.5], [N.G4, 1.5],
      [N.E4, 0.5], [N.G4, 0.5], [N.C5, 1], [N.B4, 1], [N.A4, 1.5],
      [N.A4, 0.5], [N.G4, 2], [null, 1],
      [N.D4, 0.5], [N.E4, 0.5], [N.F4, 1.5], [N.D4, 0.5], [N.E4, 0.5], [N.F4, 1.5],
      [N.D4, 0.5], [N.F4, 0.5], [N.B4, 1], [N.A4, 1], [N.G4, 1], [N.C5, 2], [null, 1.5],
    ],
  },
}

let ctx = null
let timer = null
let audioEl = null
let playing = false
let owner = null      // 'user' (the button) or 'video' (a clip started it)
// Which built-in tune plays — change this to 'twinkle', 'soft' or 'lullaby'
const TUNE = 'birthday'
let customSrc = null
const listeners = new Set()

function notify() {
  listeners.forEach(fn => fn({ playing }))
}

function playNote(freq, startAt, seconds) {
  const gain = ctx.createGain()
  gain.connect(ctx.destination)

  // Music-box envelope: quick attack, long exponential decay
  gain.gain.setValueAtTime(0.0001, startAt)
  gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + seconds + 0.6)

  // Fundamental plus quieter harmonics gives the bell-like shimmer
  for (const [ratio, level] of [[1, 1], [2, 0.3], [3, 0.1]]) {
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq * ratio
    oscGain.gain.value = level
    osc.connect(oscGain)
    oscGain.connect(gain)
    osc.start(startAt)
    osc.stop(startAt + seconds + 0.7)
  }
}

function scheduleLoop() {
  if (!ctx) return
  const tune = TUNES[TUNE] ?? TUNES.birthday

  let at = ctx.currentTime + 0.15
  for (const [freq, beats] of tune.notes) {
    const seconds = beats * tune.beat
    if (freq) playNote(freq, at, seconds)
    at += seconds
  }

  timer = setTimeout(() => {
    if (playing) scheduleLoop()
  }, (at - ctx.currentTime) * 1000)
}

function play() {
  playing = true

  try {
    if (customSrc) {
      audioEl = new Audio(customSrc)
      audioEl.loop = true
      audioEl.volume = 0.5
      audioEl.play().catch(() => {})
    } else {
      const Ctx = window.AudioContext ?? window.webkitAudioContext
      ctx = new Ctx()
      // Browsers may hand back a suspended context even after a click
      ctx.resume?.()
      scheduleLoop()
    }
  } catch (err) {
    console.error('Could not start music:', err)
    playing = false
    owner = null
  }

  notify()
}

function halt() {
  playing = false
  owner = null

  clearTimeout(timer)
  ctx?.close()
  ctx = null

  audioEl?.pause()
  audioEl = null

  notify()
}

// Started because a muted clip began playing. Never overrides music the
// person turned on themselves with the button.
export function startForVideo(src = null) {
  if (owner === 'user' || playing) return
  customSrc = src
  owner = 'video'
  play()
}

// A clip paused/ended — only stops music that same clip started, so the
// button's background music keeps going.
export function stopForVideo() {
  if (owner !== 'video') return
  halt()
}

export function toggleUser(src = null) {
  if (playing) {
    halt()
    return
  }
  customSrc = src
  owner = 'user'
  play()
}

export function getState() {
  return { playing }
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
