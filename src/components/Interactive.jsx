import { useState, useEffect } from 'react'
import './Interactive.css'
import SectionBg from './SectionBg'
import content from '../data/content.json'

const SERIES = ['全部', '星河旅人', '赛博之梦', '深海回响', '花语四季', '古城晨曦', '光阴之间']

const CHARACTERS = content.characters

const RARITY_CONFIG = {
  SSR: { color: '#FF7A30', stars: 3 },
  SR: { color: '#FFB347', stars: 2 },
  R: { color: '#FFD56B', stars: 1 },
}

export default function Interactive() {
  const [filter, setFilter] = useState('全部')
  const [selected, setSelected] = useState(null)
  const [zoomed, setZoomed] = useState(false)

  const filtered = filter === '全部' ? CHARACTERS : CHARACTERS.filter((c) => c.series === filter)

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="interactive" className="interactive">
      <SectionBg variant="interactive" />
      <div className="container interactive__content">
        <div className="interactive__header reveal" data-reveal="scale">
          <span className="section-tag">Interactive / 互动体验</span>
          <h2 className="section-title">
            翻开卡牌<br />
            <span className="accent">遇见每一个灵魂</span>
          </h2>
          <p className="section-desc">
            来自各部漫剧的角色化身卡牌。点击卡片，查看角色档案、能力数值与经典台词。
          </p>
        </div>

        {/* 系列筛选 */}
        <div className="carddex__filters reveal">
          {SERIES.map((s) => (
            <button
              key={s}
              className={`carddex__filter ${filter === s ? 'carddex__filter--active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* 卡牌网格 */}
        <div className="carddex__grid reveal">
          {filtered.map((char, i) => {
            const rarity = RARITY_CONFIG[char.rarity]
            return (
              <div
                key={char.id}
                className="carddex__card-wrap"
                style={{ '--card-index': i }}
                onClick={() => setSelected(char)}
                onMouseMove={(e) => {
                  const card = e.currentTarget.querySelector('.carddex__card-static')
                  if (!card) return
                  const rect = card.getBoundingClientRect()
                  const x = (e.clientX - rect.left) / rect.width - 0.5
                  const y = (e.clientY - rect.top) / rect.height - 0.5
                  card.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 12}deg) translateY(-8px)`
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget.querySelector('.carddex__card-static')
                  if (card) card.style.transform = ''
                }}
              >
                <div className="carddex__card-static" style={{ '--card-glow': char.glow }}>
                  <div className="carddex__art" style={{ background: char.gradient }}>
                    <div className="carddex__art-noise" />
                    <div className="carddex__art-element">{char.elementIcon}</div>
                    {char.imageSrc ? (
                      <img className="carddex__art-image" src={char.imageSrc} alt={char.name} draggable={false} />
                    ) : (
                      <div className="carddex__art-name">{char.name}</div>
                    )}
                  </div>

                  <div className="carddex__front-body">
                    <h4 className="carddex__title">{char.name} · {char.title}</h4>
                    <div className="carddex__element-badge">
                      <span className="carddex__element-icon">{char.elementIcon}</span>
                      {char.element} · {char.series}
                    </div>
                    <div className="carddex__click-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      点击查看
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* —— 角色详情 Modal —— */}
      {selected && (
        <div className="carddex__modal-overlay" onClick={() => setSelected(null)}>
          <div className="carddex__modal glass" onClick={(e) => e.stopPropagation()}>
            {/* 手机端返回栏 */}
            <button className="carddex__modal-back" onClick={() => setSelected(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              返回
            </button>
            <button className="carddex__modal-close" onClick={() => setSelected(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* 左：角色图 */}
            <div className="carddex__modal-art" style={{ background: selected.gradient }}>
              <div className="carddex__art-noise" />
              {selected.imageSrc ? (
                <img
                  className="carddex__modal-image"
                  src={selected.imageSrc}
                  alt={selected.name}
                  draggable={false}
                  onClick={() => setZoomed(true)}
                />
              ) : (
                <div className="carddex__modal-name-big">{selected.name}</div>
              )}
              {selected.imageSrc && (
                <button className="carddex__zoom-btn" onClick={() => setZoomed(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* 右：详情 */}
            <div className="carddex__modal-body">
              <h3 className="carddex__modal-title">{selected.name}</h3>
              <span className="carddex__modal-subtitle">{selected.title}</span>

              <div className="carddex__modal-meta">
                <span className="carddex__modal-meta-item">
                  <span className="carddex__element-icon">{selected.elementIcon}</span>
                  {selected.element}
                </span>
                <span className="carddex__modal-meta-item">{selected.series}</span>
              </div>

              <p className="carddex__modal-story">{selected.backstory}</p>

              <div className="carddex__modal-quote">
                <span className="carddex__quote-mark">"</span>
                {selected.quote}
              </div>

              <div className="carddex__modal-actions">
                <button
                  className="carddex__modal-btn carddex__modal-btn--primary"
                  onClick={() => {
                    if (selected.imageSrc) {
                      const a = document.createElement('a')
                      a.href = selected.imageSrc
                      a.download = `${selected.name}.png`
                      a.click()
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  下载素材
                </button>
                <button className="carddex__modal-btn carddex__modal-btn--ghost carddex__modal-btn--back" onClick={() => setSelected(null)}>
                  返回
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* —— 角色图全屏放大 —— */}
      {zoomed && selected?.imageSrc && (
        <div className="carddex__zoom-overlay" onClick={() => setZoomed(false)}>
          <button className="carddex__zoom-back" onClick={() => setZoomed(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回
          </button>
          <button className="carddex__zoom-close" onClick={() => setZoomed(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <img
            className="carddex__zoom-image"
            src={selected.imageSrc}
            alt={selected.name}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
          <span className="carddex__zoom-name">{selected.name} · {selected.title}</span>
        </div>
      )}
    </section>
  )
}
