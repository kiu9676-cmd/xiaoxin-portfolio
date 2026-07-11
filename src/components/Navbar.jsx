import { useState, useEffect } from 'react'
import logoAvatar from '../assets/avatar.png'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'about', label: '角色介绍', labelEn: 'About' },
  { id: 'experience', label: '职业经历', labelEn: 'Career', mobileOnly: false },
  { id: 'works', label: '作品案例', labelEn: 'Works' },
  { id: 'interactive', label: '互动体验', labelEn: 'Play' },
  { id: 'contact', label: '联系方式', labelEn: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // 高亮当前 section
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveId(NAV_ITEMS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    setMenuOpen(false)
    const section = document.getElementById(id)
    if (!section) return

    // 先移除目标区域的 visible，让动画重新播放
    const reveals = section.querySelectorAll('.reveal')
    reveals.forEach((el) => el.classList.remove('visible'))

    // 滚动到目标区域
    section.scrollIntoView({ behavior: 'smooth' })

    // 滚动完成后重新触发入场动画
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add('visible'))
    }, 700)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a className="navbar__logo" href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="navbar__logo-mark">
            {logoAvatar ? (
              <img src={logoAvatar} alt="XiaoXin" className="navbar__logo-avatar" />
            ) : (
              'X'
            )}
          </span>
          <span className="navbar__logo-text">XiaoXin</span>
        </a>

        {/* 桌面导航 */}
        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`navbar__link ${activeId === item.id ? 'navbar__link--active' : ''}`}
                onClick={() => handleClick(item.id)}
              >
                <span className="navbar__link-cn">{item.label}</span>
                <span className="navbar__link-en">{item.labelEn}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* 移动端菜单按钮 */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* 移动端展开菜单 —— 职业经历在手机端隐藏 */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {NAV_ITEMS.filter((item) => item.id !== 'experience').map((item) => (
          <button key={item.id} className="navbar__mobile-link" onClick={() => handleClick(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
