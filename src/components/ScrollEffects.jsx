import { useEffect, useRef, useState } from 'react'
import './ScrollEffects.css'

export default function ScrollEffects() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)

        // 视差：只作用于背景元素，不动 hero__content（避免和 CSS 动画冲突）
        const hero = document.getElementById('hero')
        if (hero && scrollTop < window.innerHeight) {
          const orbs = hero.querySelectorAll('.hero__bg-orb')
          const grid = hero.querySelector('.hero__bg-grid')
          const canvas = hero.querySelector('.hero__canvas')
          const offset = scrollTop * 0.3
          orbs.forEach((orb, i) => {
            orb.style.transform = `translate3d(0, ${offset * (0.5 + i * 0.2)}px, 0)`
          })
          if (grid) grid.style.transform = `translate3d(0, ${offset * 0.15}px, 0)`
          if (canvas) canvas.style.transform = `translate3d(0, ${offset * 0.1}px, 0)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* 顶部进度条 */}
      <div className="scroll-progress">
        <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
      </div>
    </>
  )
}
