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

// Clips without a title in curatedMoments.js all share this one.
const DEFAULT_TITLE = 'Giggle Moment 🤭'

// Clips listed in curatedMoments.js keep their own title, mute setting and
// music. They're matched by filename, so a clip that's been deleted from the
// folder is simply skipped instead of breaking the build.
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
      {/* #t=0.1 makes the browser paint a real frame instead of a black box */}
      <video
        key={isOpen ? 'open' : 'preview'}
        src={`${video.url}#t=0.1`}
        ref={el => { if (el) el.muted = isOpen ? video.muteVideo : true }}
        onPlay={handlePlay}
        onPause={stopForVideo}
        onEnded={stopForVideo}
        onVolumeChange={handleVolumeChange}
        controls={isOpen}
        autoPlay={isOpen}
        preload="metadata"
        playsInline
      />

      {!isOpen && (
        <span className="video-play" aria-hidden>▶</span>
      )}

      <p className="video-card-label">{video.label}</p>
    </div>
  )
}

function VideoGallery() {
  // Shuffled once per visit, so it's a different handful every time
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
