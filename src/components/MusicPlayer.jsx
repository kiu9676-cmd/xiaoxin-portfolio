import { useState, useRef, useEffect } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const wasPlayingBeforeVideo = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
  }, [])

  // 监听视频播放/暂停事件，协调 BGM
  useEffect(() => {
    const onPauseBGM = () => {
      if (playing) {
        wasPlayingBeforeVideo.current = true
        audioRef.current?.pause()
        setPlaying(false)
      } else {
        wasPlayingBeforeVideo.current = false
      }
    }

    const onResumeBGM = () => {
      if (wasPlayingBeforeVideo.current) {
        audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
        wasPlayingBeforeVideo.current = false
      }
    }

    window.addEventListener('bgm-pause', onPauseBGM)
    window.addEventListener('bgm-resume', onResumeBGM)
    return () => {
      window.removeEventListener('bgm-pause', onPauseBGM)
      window.removeEventListener('bgm-resume', onResumeBGM)
    }
  }, [playing])

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/BGM.mp3" loop preload="auto" />
      <button
        className={`music-player ${playing ? 'music-player--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? '关闭音乐' : '播放音乐'}
      >
        <div className="music-player__icon">
          {playing ? (
            <div className="music-player__bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </div>
        <span className="music-player__label">
          {playing ? 'BGM' : '播放音乐'}
        </span>
      </button>
    </>
  )
}
