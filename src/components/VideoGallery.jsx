import { useState } from 'react'
import { MOMENTS, DEFAULT_MUSIC } from '../data/curatedMoments'
import { startForVideo, stopForVideo } from '../lib/music'

// Every clip in src/assets/vibhu-video shows up here automatically —
// drop a new one into the folder and it appears.
const videoModules = import.meta.glob('../assets/vibhu-video/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})

// A pool of real photos to use as a poster for clips that don't have their
// own still from curatedMoments.js — beats a flat gradient. Family/group
// shots (used over in FamilyMoments.jsx / PageBackground.jsx) are excluded
// so only solo photos of Vaibhavi show up here.
const FAMILY_PHOTOS = new Set([
  'MMF_5322.jpg.jpeg',
  'MMF_5041.jpg.jpeg',
  'MMF_5307.jpg.jpeg',
  '20260509_131535.jpg',
  'IMG-20260621-WA0134.jpg',
  'IMG-20260912-WA0061.jpg',
  'IMG-20251005-WA0819.jpg',
  'IMG-20251005-WA0376.jpg',
  'IMG-20250913-WA0018.jpg',
])

const photoModules = import.meta.glob('../assets/vibhu-photo/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const PHOTO_POOL = Object.entries(photoModules)
  .filter(([path]) => !FAMILY_PHOTOS.has(path.split('/').pop()))
  .map(([, url]) => url)

function randomPhoto() {
  if (PHOTO_POOL.length === 0) return null
  return PHOTO_POOL[Math.floor(Math.random() * PHOTO_POOL.length)]
}

// Clips without a title in curatedMoments.js all share this one.
const DEFAULT_TITLE = 'Giggle Moment 🤭'

// Clips listed in curatedMoments.js keep their own title, mute setting,
// music, and a still photo to show before it's played. They're matched by
// filename, so a clip that's been deleted from the folder is simply
// skipped instead of breaking the build.
const VIDEO_BY_NAME = new Map(
  Object.entries(videoModules).map(([path, url]) => [path.split('/').pop(), url])
)

const MOMENT_BY_URL = new Map()
for (const moment of MOMENTS) {
  const url = moment.video && VIDEO_BY_NAME.get(moment.video)
  if (url) MOMENT_BY_URL.set(url, moment)
}

const VIDEOS = Object.entries(videoModules).map(([path, url]) => {
  const moment = MOMENT_BY_URL.get(url)
  return {
    id: path,
    url,
    label: DEFAULT_TITLE,
    poster: moment?.photo ?? randomPhoto(),
    muteVideo: Boolean(moment?.muteVideo),
    music: moment?.music ?? DEFAULT_MUSIC,
  }
})

const PAGE_SIZE = 4

function shuffle(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function VideoCard({ video, index, isOpen, onOpen }) {
  function handlePlay() {
    if (video.muteVideo) startForVideo(video.music)
    else stopForVideo()
  }

  function handleVolumeChange(e) {
    const el = e.currentTarget
    if (el.muted && !el.paused) startForVideo(video.music)
    else if (!el.muted) stopForVideo()
  }

  return (
    <div
      className={`video-card ${isOpen ? 'is-open' : ''}`}
      style={{ '--d': `${(index % PAGE_SIZE) * 70}ms` }}
      onClick={() => !isOpen && onOpen(video.id)}
    >
      {isOpen ? (
        // Only mounted once opened, so nothing loads until it's actually wanted
        <video
          src={video.url}
          ref={el => { if (el) el.muted = video.muteVideo }}
          onPlay={handlePlay}
          onPause={stopForVideo}
          onEnded={stopForVideo}
          onVolumeChange={handleVolumeChange}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <div
          className="video-poster"
          style={video.poster ? { backgroundImage: `url(${video.poster})` } : undefined}
        >
          <span className="video-play" aria-hidden>▶</span>
        </div>
      )}

      <p className="video-card-label">{video.label}</p>
    </div>
  )
}

function VideoGallery() {
  // A fresh random handful on every page load
  const [deck, setDeck] = useState(() => shuffle(VIDEOS).slice(0, PAGE_SIZE))
  const [openId, setOpenId] = useState(null)

  if (VIDEOS.length === 0) return null

  function reshuffle() {
    setDeck(shuffle(VIDEOS).slice(0, PAGE_SIZE))
    setOpenId(null)
  }

  return (
    <section className="video-gallery">
      <h2>Vibhu's Video Moments 🎬</h2>
      <p className="video-hint">Tap a card to play ✨</p>

      <div className="video-deck">
        {deck.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i}
            isOpen={openId === video.id}
            onOpen={setOpenId}
          />
        ))}
      </div>

      <div className="video-actions">
        <button className="pill-btn" onClick={reshuffle}>
          Show me more 🎲
        </button>
      </div>
    </section>
  )
}

export default VideoGallery
