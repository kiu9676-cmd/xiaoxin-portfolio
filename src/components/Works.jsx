import { useState, useEffect, useRef } from 'react'
import './Works.css'
import SectionBg from './SectionBg'

const CATEGORIES = ['全部', 'AI漫剧', '短片']

const WORKS = [
  {
    id: 1,
    title: '星河旅人',
    category: 'AI漫剧',
    type: 'video',
    desc: '一段穿越星际的孤独旅程，用 AI 生成构建梦幻宇宙叙事',
    detail: '本项目使用 Midjourney 生成概念设定，Runway Gen-2 生成动态画面，经 DaVinci Resolve 调色后合成。讲述了一位孤独的星际旅人在宇宙边缘收到过去信号的故事，融合赛博美学与哲学思考。',
    tags: ['AI生成', '科幻', '4K'],
    duration: '03:24',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #4a1c5e 40%, #FF7A30 100%)',
    videoSrc: '/videos/xhlr.mp4',
    posterSrc: '/images/posters/xhlr.jpg',
  },
  {
    id: 2,
    title: '赛博之梦',
    category: 'AI漫剧',
    type: 'video',
    desc: '霓虹城市的未来叙事，探讨人与AI的共生关系',
    detail: '赛博朋克风格的 AI 漫剧短片。使用 Pika Labs 生成核心动态场景，配合 ChatGPT 辅助剧本创作。探讨了当 AI 拥有梦境后，它与人类记忆之间模糊的边界。',
    tags: ['赛博朋克', '叙事', '8K'],
    duration: '05:12',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a3e 40%, #FF6B35 100%)',
    videoSrc: '/videos/赛博.mp4',
    posterSrc: '/images/posters/赛博.jpg',
  },
  {
    id: 3,
    title: '深海回响',
    category: 'AI漫剧',
    type: 'video',
    desc: '深海世界的神秘探索，AI生成构建水下奇观',
    detail: '深海奇幻题材 AI 漫剧。以 Kling AI 生成水下动态场景，构建了一个沉睡千年后苏醒的深海古城。主角"渊"作为最后一位海语者，肩负起传承海族记忆的使命。',
    tags: ['奇幻', '水下', 'IMAX'],
    duration: '04:08',
    gradient: 'linear-gradient(135deg, #06141d 0%, #1a4a5e 40%, #FFB347 100%)',
    videoSrc: '/videos/深海.mp4',
    posterSrc: '/images/posters/深海.jpg',
  },
  {
    id: 4,
    title: '光阴之间',
    category: '短片',
    type: 'video',
    desc: '时间流转的视觉诗篇，从黎明到黄昏的光影叙事',
    detail: '实验性短片作品。以"时间"为唯一主角，通过 AI 生成不同时段的光影变化，配合原创音乐，呈现从黎明到黄昏的一日光影流转。无对白纯视觉叙事。',
    tags: ['实验', '光影', '6K'],
    duration: '02:45',
    gradient: 'linear-gradient(135deg, #1e1208 0%, #7a5c2e 40%, #FFE9A8 100%)',
    videoSrc: '/videos/光阴.mp4',
    posterSrc: '/images/posters/光阴.jpg',
  },
]

export default function Works() {
  const [filter, setFilter] = useState('全部')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState(false)
  const [featured, setFeatured] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const videoRef = useRef(null)

  const filtered = filter === '全部' ? WORKS : WORKS.filter((w) => w.category === filter)

  // 自动轮播推荐
  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setFeatured((f) => (f + 1) % WORKS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const featuredWork = WORKS[featured]

  // 关闭 Modal —— 暂停视频 + 恢复 BGM
  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    window.dispatchEvent(new Event('bgm-resume'))
    setSelected(null)
  }

  // Modal 打开时锁定 body 滚动
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  // ESC 关闭 Modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleMore = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <section id="works" className="works">
      <SectionBg variant="works" />
      <div className="container works__content">
        {/* 标题区 */}
        <div className="works__header reveal" data-reveal="blur">
          <div>
            <span className="section-tag">Works / 作品案例</span>
            <h2 className="section-title">
              每一帧都是<br />
              <span className="accent">想象力的回声</span>
            </h2>
          </div>
          <p className="section-desc works__header-desc">
            从 AI 漫剧到视觉海报，探索技术与艺术的交汇。
            以下为精选作品集，持续更新中。
          </p>
        </div>

        {/* —— 自动轮播推荐 —— */}
        <div
          className="works__featured reveal"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="works__featured-bg" style={{ background: featuredWork.gradient }}>
            {featuredWork.posterSrc && (
              <img className="works__featured-video" src={featuredWork.posterSrc} alt={featuredWork.title} />
            )}
            <div className="works__featured-overlay" />
          </div>

          <div className="works__featured-content">
            <span className="works__featured-label">FEATURED</span>
            <h3 className="works__featured-title">{featuredWork.title}</h3>
            <p className="works__featured-desc">{featuredWork.desc}</p>
            <div className="works__featured-tags">
              {featuredWork.tags.map((tag) => (
                <span key={tag} className="works__featured-tag">{tag}</span>
              ))}
            </div>
            <button className="works__featured-btn" onClick={() => setSelected(featuredWork)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              观看作品
            </button>
          </div>

          {/* 轮播指示器 */}
          <div className="works__featured-dots">
            {WORKS.map((_, i) => (
              <button
                key={i}
                className={`works__featured-dot ${i === featured ? 'works__featured-dot--active' : ''}`}
                onClick={() => setFeatured(i)}
                aria-label={`第 ${i + 1} 个`}
              />
            ))}
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="works__filters reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`works__filter ${filter === cat ? 'works__filter--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 作品网格 */}
        <div className="works__grid reveal">
          {filtered.map((work, i) => (
            <div
              key={work.id}
              className="works__item"
              style={{ '--item-index': i }}
              onMouseEnter={() => setHovered(work.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* 视觉区 —— 可点击 */}
              <div
                className="works__visual"
                style={{ background: work.gradient }}
                onClick={() => setSelected(work)}
              >
                {/* 封面图 —— 用图片代替视频，秒加载 */}
                {work.posterSrc && (
                  <img className="works__visual-video" src={work.posterSrc} alt={work.title} />
                )}

                {/* 噪点纹理 */}
                <div className="works__visual-noise" />

                {/* 类型标识 */}
                <div className="works__type-badge">
                  {work.type === 'video' ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>VIDEO</span>
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                      <span>POSTER</span>
                    </>
                  )}
                </div>

                {/* 播放按钮 (hover时) */}
                {work.type === 'video' && (
                  <div className={`works__play ${hovered === work.id ? 'works__play--show' : ''}`}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                {/* 底部信息 */}
                <div className="works__overlay">
                  <div className="works__overlay-tags">
                    {work.tags.map((tag) => (
                      <span key={tag} className="works__overlay-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="works__overlay-title">{work.title}</h3>
                  <p className="works__overlay-desc">{work.desc}</p>
                </div>
              </div>

              {/* 底部文字信息 */}
              <div className="works__info">
                <div className="works__info-left" onClick={() => setSelected(work)} style={{ cursor: 'pointer' }}>
                  <h4>{work.title}</h4>
                  <span className="works__info-cat">{work.category}</span>
                </div>
                <button className="works__info-btn" onClick={() => setSelected(work)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 查看更多 */}
        <div className="works__more reveal">
          <button className="works__more-btn" onClick={handleMore}>
            <span>查看完整作品集</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* —— 作品详情 Modal —— */}
      {selected && (
        <div className="works__modal-overlay" onClick={closeModal}>
          <div className="works__modal" onClick={(e) => e.stopPropagation()}>
            {/* 手机端返回栏 */}
            <button className="works__modal-back" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              返回
            </button>
            {/* 关闭按钮 */}
            <button className="works__modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* 左：媒体预览区 */}
            <div className="works__modal-media">
              {selected.type === 'video' && selected.videoSrc ? (
                <video
                  className="works__modal-video"
                  src={selected.videoSrc}
                  poster={selected.posterSrc}
                  controls
                  autoPlay
                  loop
                  ref={videoRef}
                  onPlay={() => window.dispatchEvent(new Event('bgm-pause'))}
                  onPause={() => window.dispatchEvent(new Event('bgm-resume'))}
                />
              ) : (
                <>
                  <div className="works__modal-noise" style={{ background: selected.gradient }} />
                  {selected.type === 'video' ? (
                    <div className="works__modal-player">
                      <div className="works__modal-play-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="works__modal-duration">{selected.duration}</span>
                      <span className="works__modal-hint">视频素材即将上线</span>
                    </div>
                  ) : (
                    <div className="works__modal-poster" style={{ background: selected.gradient }}>
                      <span className="works__modal-hint">高清海报即将上线</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 右：详情区 */}
            <div className="works__modal-body">
              <div className="works__modal-tags">
                {selected.tags.map((tag) => (
                  <span key={tag} className="works__modal-tag">{tag}</span>
                ))}
              </div>

              <h3 className="works__modal-title">{selected.title}</h3>

              <div className="works__modal-meta">
                <span className="works__modal-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                  {selected.category}
                </span>
                <span className="works__modal-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {selected.type === 'video' ? `视频 · ${selected.duration}` : '海报设计'}
                </span>
              </div>

              <p className="works__modal-desc">{selected.detail}</p>

              <div className="works__modal-actions">
                <button
                  className="works__modal-btn works__modal-btn--primary"
                  onClick={() => {
                    if (selected.videoSrc) {
                      const a = document.createElement('a')
                      a.href = selected.videoSrc
                      a.download = selected.title + '.mp4'
                      a.click()
                    } else {
                      setToast(true)
                      setTimeout(() => setToast(false), 3000)
                    }
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  下载素材
                </button>
                <button
                  className="works__modal-btn works__modal-btn--ghost"
                  onClick={closeModal}
                >
                  返回
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* —— Toast 提示 —— */}
      {toast && (
        <div className="works__toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          完整作品集正在整理中，敬请期待！
        </div>
      )}
    </section>
  )
}
