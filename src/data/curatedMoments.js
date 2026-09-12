// One favourite photo (and, where we have one, a video) per moment.
// Photos are imported; videos are named by filename only, so deleting a clip
// from src/assets/vibhu-video never breaks the site — it's just skipped.
// Lines marked 🔧 are auto-picked guesses; swap them for the real photo.

import firstDay from '../assets/vibhu-photo/IMG-20250913-WA0002.jpg'

import month1 from '../assets/vibhu-photo/IMG-20251005-WA0818.jpg'

import month3 from '../assets/vibhu-photo/2-month.jpg'
import month2 from '../assets/vibhu-photo/IMG-20251112-WA0022.jpg'

import month4 from '../assets/vibhu-photo/IMG-20260213-WA0006.jpg'

import month5 from '../assets/vibhu-photo/IMG-20251214-WA0009.jpg'

import firstBite from '../assets/vibhu-photo/IMG-20260207-WA0003.jpg' // 🔧 swap for the real first-bite photo

import month6 from '../assets/vibhu-photo/IMG-20260207-WA0004.jpg'

import month7 from '../assets/vibhu-photo/IMG-20260426-WA0025.jpg'

import month8 from '../assets/vibhu-photo/IMG-20260303-WA0011.jpg' // 🔧 swap for a nicer photo

import month9 from '../assets/vibhu-photo/IMG-20260509-WA0488.jpg'

import month10 from '../assets/vibhu-photo/IMG-20260621-WA0086.jpg' // 🔧 swap for a nicer photo

import month11 from '../assets/vibhu-photo/MMF_3058.jpg.jpeg'

import month12 from '../assets/vibhu-photo/IMG-20260810-WA0003.jpg'

import firstbite from '../assets/vibhu-photo/IMG-20260121-WA0000.jpg'
import bath from '../assets/vibhu-photo/IMG-20260121-WA0001.jpg'

import favouritePiano from '../assets/vibhu-photo/MMF_4978.jpg.jpeg'
// import favouriteDance from '../assets/vibhu-photo/20260830_161048.jpg'
import favouriteSmile from '../assets/vibhu-photo/MMF_5010.jpg.jpeg'

// Background song for the video section. Drop an .mp3 into src/assets, import
// it here, and it replaces the built-in music-box melody everywhere:
//   import mySong from '../assets/my-song.mp3'
//   export const DEFAULT_MUSIC = mySong
// Leave it null to use the built-in tune.
export const DEFAULT_MUSIC = null

// One flat, ordered list — everything shown in the gallery, favourites and
// monthly moments alike. Reorder anything just by moving its line up or
// down in this array.
//
// Optional per-entry settings:
//   video      — a filename in src/assets/vibhu-video (missing = skipped)
//   videoLabel — a different (funnier) title just for the video section
//   muteVideo  — true silences that clip and plays music over it instead;
//                leave it off to keep the clip's own sound
//   music      — a song just for that clip (overrides DEFAULT_MUSIC)
export const MOMENTS = [
  { label: 'First Day 👶', photo: firstDay },
  { label: 'First Eat 🍽️', photo: firstbite },
  { label: 'Bath 🛁', photo: bath },
  { label: 'Month 1 🍼', photo: month1, video: 'VID-20251005-WA0441.mp4', videoLabel: 'Swag Moment 😎', muteVideo: true },
  { label: 'Month 2 🧸', photo: month2, video: 'VID-20251021-WA0000.mp4', videoLabel: 'Tiny Boss 👑' },
  { label: 'Month 3 😊', photo: month3, video: 'VID-20251115-WA0007.mp4', videoLabel: 'Giggle Attack 🤭',muteVideo: true },
  { label: 'Month 4 🎈', photo: month4 },
  { label: 'Month 5 🌟', photo: month5, video: 'VID-20260115-WA0072.mp4', videoLabel: 'Drama Queen 🎭' },
  { label: 'Month 6 🦷', photo: month6 },
  { label: 'Month 7 🍓', photo: month7, video: 'VID-20260409-WA0000.mp4', videoLabel: 'Full Masti 🤩' },
  { label: 'Month 8 🐥', photo: month8 },
  { label: 'Month 9 🎀', photo: month9 },
  { label: 'Month 10 🐾', photo: month10, video: 'VID-20260712-WA0011.mp4', videoLabel: 'Driving Moment 💃', muteVideo: true },
  { label: 'Month 11 🌈', photo: month11, video: 'VID-20260713-WA0000.mp4', videoLabel: 'Superstar Mode ⭐',muteVideo: true },
  { label: 'Our little star turns One 👑', photo: favouritePiano },
  { label: 'That smile says it all 🥹', photo: favouriteSmile },
]
