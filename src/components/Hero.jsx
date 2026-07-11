import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  // Canvas 粒子系统 —— 模拟梦幻光粒子
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.5 ? 28 : 42,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`
        ctx.shadowBlur = 12
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.6)`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* 动态背景层 —— 模拟全屏视频效果 */}
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />
        <div className="hero__bg-grid" />
        <canvas className="hero__canvas" ref={canvasRef} />
        <div className="hero__bg-vignette" />
        {/* 预留视频位置 —— 后续替换为实际视频 */}
        {/*
        <video className="hero__video" autoPlay muted loop playsInline poster="">
          <source src="" type="video/mp4" />
        </video>
        */}
      </div>

      {/* 内容 */}
      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          AI Comic Drama Creator
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">用 <em>AI</em> 编织</span>
          <span className="hero__title-line">视觉故事</span>
        </h1>

        <p className="hero__subtitle">
          XiaoXin · AI漫剧制作师
          <br />
          <span className="hero__subtitle-en">
            Where artificial intelligence meets cinematic storytelling
          </span>
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={scrollToWorks}>
            <span>浏览作品</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero__btn hero__btn--ghost" onClick={scrollToContact}>
            联系方式
          </button>
        </div>

      </div>

      {/* 滚动提示 */}
      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
