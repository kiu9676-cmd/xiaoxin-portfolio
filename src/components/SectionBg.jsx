import './SectionBg.css'

/**
 * 可复用的区域背景动效组件
 * variant: "experience" | "works" | "interactive" | "contact"
 * 纯 CSS 动画，2-3 个缓慢浮动的暖色光球
 */
const VARIANT_CONFIG = {
  experience: {
    orbs: [
      { cls: 'section-bg__orb--1', color: 'rgba(255, 122, 48, 0.55)' },
      { cls: 'section-bg__orb--2', color: 'rgba(255, 179, 71, 0.45)' },
      { cls: 'section-bg__orb--3', color: 'rgba(255, 213, 107, 0.4)' },
    ],
  },
  works: {
    orbs: [
      { cls: 'section-bg__orb--1', color: 'rgba(255, 179, 71, 0.5)' },
      { cls: 'section-bg__orb--2', color: 'rgba(255, 122, 48, 0.5)' },
    ],
  },
  interactive: {
    orbs: [
      { cls: 'section-bg__orb--1', color: 'rgba(255, 213, 107, 0.5)' },
      { cls: 'section-bg__orb--2', color: 'rgba(255, 122, 48, 0.45)' },
      { cls: 'section-bg__orb--3', color: 'rgba(255, 179, 71, 0.4)' },
    ],
  },
  contact: {
    orbs: [
      { cls: 'section-bg__orb--1', color: 'rgba(255, 122, 48, 0.5)' },
      { cls: 'section-bg__orb--2', color: 'rgba(255, 213, 107, 0.45)' },
    ],
  },
}

export default function SectionBg({ variant = 'experience' }) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.experience

  return (
    <div className={`section-bg section-bg--${variant}`} aria-hidden="true">
      {config.orbs.map((orb, i) => (
        <span
          key={i}
          className={`section-bg__orb ${orb.cls}`}
          style={{ background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)` }}
        />
      ))}
    </div>
  )
}
