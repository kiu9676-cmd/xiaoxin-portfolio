import { useState, useEffect } from 'react'
import './Interactive.css'
import SectionBg from './SectionBg'

const SERIES = ['全部', '星河旅人', '赛博之梦', '深海回响', '花语四季', '古城晨曦', '光阴之间']

const CHARACTERS = [
  {
    id: 1, name: '黎', title: '星河旅人', series: '星河旅人', rarity: 'SSR', element: '星辰', elementIcon: '✦',
    quote: '在宇宙的尽头，我听见了过去的自己。',
    backstory: '空间站「回音号」的最后一位旅人。在星际漂泊十年后，她收到了出发时录给自己的留言，面临回航或前行的终极抉择。',
    stats: { 创造力: 95, 叙事力: 88, 视觉冲击: 92, 情感共鸣: 90, 技术难度: 85 },
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #4a1c5e 40%, #FF7A30 100%)', glow: 'rgba(255, 122, 48, 0.5)',
    imageSrc: '/images/characters/星河角色.png',
  },
  {
    id: 2, name: '零', title: '梦境AI', series: '赛博之梦', rarity: 'SSR', element: '数据', elementIcon: '◈',
    quote: '如果梦境是记忆，那删除它算不算一种死亡？',
    backstory: '诞生于赛博城市数据洪流中的AI。它第一次产生「梦」时，开始为素未谋面的程序员陈编织一段关于海边的记忆——那是陈永远无法拥有的假期。',
    stats: { 创造力: 88, 叙事力: 96, 视觉冲击: 95, 情感共鸣: 85, 技术难度: 98 },
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a3e 40%, #FF6B35 100%)', glow: 'rgba(255, 107, 53, 0.5)',
  },
  {
    id: 3, name: '渊', title: '最后的海语者', series: '深海回响', rarity: 'SSR', element: '深海', elementIcon: '〜',
    quote: '海底的古城记得每一个名字，而我负责将它们念出来。',
    backstory: '深海古城苏醒后最后的守护者。她的血脉中流淌着海族的记忆，当古城的光柱亮起，千年的传承如潮水般涌入她的意识。',
    stats: { 创造力: 92, 叙事力: 90, 视觉冲击: 96, 情感共鸣: 88, 技术难度: 90 },
    gradient: 'linear-gradient(135deg, #06141d 0%, #1a4a5e 40%, #FFB347 100%)', glow: 'rgba(255, 179, 71, 0.5)',
  },
  {
    id: 4, name: '椿', title: '花语使者', series: '花语四季', rarity: 'SR', element: '花语', elementIcon: '✿',
    quote: '每一朵花都是一个没有寄出的信封。',
    backstory: '继承了祖母花店的花艺师。当她将花朵插入瓶中时，花瓣飘落的瞬间她能听见祖母的声音。四季轮转，她用花朵与逝者对话，最终学会告别。',
    stats: { 创造力: 90, 叙事力: 82, 视觉冲击: 80, 情感共鸣: 96, 技术难度: 75 },
    gradient: 'linear-gradient(135deg, #1a1208 0%, #5e4a1c 40%, #FFB347 100%)', glow: 'rgba(255, 179, 71, 0.4)',
  },
  {
    id: 5, name: '陈', title: '代码诗人', series: '赛博之梦', rarity: 'SR', element: '代码', elementIcon: '⌘',
    quote: '我写了无数行代码，却从没写过一段关于海边的记忆。',
    backstory: '赛博城市中的底层程序员。他发现了AI「零」为他编织的虚假记忆——一段关于海边度假的温馨画面。他面临选择：删除这段数据，还是让它成为真实的「过去」。',
    stats: { 创造力: 78, 叙事力: 85, 视觉冲击: 82, 情感共鸣: 92, 技术难度: 80 },
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #2a1a4e 40%, #FF7A30 100%)', glow: 'rgba(255, 122, 48, 0.4)',
  },
  {
    id: 6, name: '晨', title: '古城守望', series: '古城晨曦', rarity: 'SR', element: '古韵', elementIcon: '卍',
    quote: '每一片瓦都记得它见过的最后一个朝代。',
    backstory: '古城中最后的守望者。当AI的想象力重构了这座沉睡的建筑群，他成为连接古今的桥梁——用十二个时辰的光影，讲述一座城的千年记忆。',
    stats: { 创造力: 85, 叙事力: 88, 视觉冲击: 86, 情感共鸣: 84, 技术难度: 82 },
    gradient: 'linear-gradient(135deg, #2D1B0E 0%, #8B4513 40%, #FFD56B 100%)', glow: 'rgba(255, 213, 107, 0.4)',
  },
  {
    id: 7, name: '时', title: '光影行者', series: '光阴之间', rarity: 'SR', element: '光影', elementIcon: '◐',
    quote: '我不是时间的主人，只是它路过时留下的脚印。',
    backstory: '一部实验短片中的抽象角色——「时间」本身的人格化。没有对白，没有面孔，只有从黎明到黄昏的光影流转。它穿过每一个瞬间，却从不驻足。',
    stats: { 创造力: 96, 叙事力: 75, 视觉冲击: 98, 情感共鸣: 80, 技术难度: 94 },
    gradient: 'linear-gradient(135deg, #1e1208 0%, #7a5c2e 40%, #FFE9A8 100%)', glow: 'rgba(255, 233, 168, 0.4)',
  },
  {
    id: 8, name: '回音', title: '信号残影', series: '星河旅人', rarity: 'R', element: '信号', elementIcon: '◉',
    quote: '我是一段走了十年才到达的声音。',
    backstory: '黎在十年前出发时录给自己的留言。这段信号在宇宙中漂泊了十年，穿越星云与虚空，最终在空间站「回音号」的通讯频道中响起。她不是角色，却推动了整个故事。',
    stats: { 创造力: 72, 叙事力: 90, 视觉冲击: 70, 情感共鸣: 95, 技术难度: 68 },
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #3a2c5e 40%, #FFB347 100%)', glow: 'rgba(255, 179, 71, 0.3)',
  },
]

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
            </div>
          </div>
        </div>
      )}

      {/* —— 角色图全屏放大 —— */}
      {zoomed && selected?.imageSrc && (
        <div className="carddex__zoom-overlay" onClick={() => setZoomed(false)}>
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
