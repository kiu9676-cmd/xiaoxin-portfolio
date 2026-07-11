import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Logo */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-mark">X</span>
              <span className="footer__logo-text">XiaoXin</span>
            </div>
            <p className="footer__tagline">
              AI Comic Drama Creator
              <br />
              用 AI 编织视觉故事
            </p>
          </div>

          {/* 导航 */}
          <div className="footer__nav">
            <h5>导航</h5>
            <a href="#about">角色介绍</a>
            <a href="#experience">职业经历</a>
            <a href="#works">作品案例</a>
            <a href="#interactive">互动体验</a>
            <a href="#contact">联系方式</a>
          </div>

          {/* 联系 */}
          <div className="footer__nav">
            <h5>联系</h5>
            <a href="tel:19173919554">191 7391 9554</a>
            <a href="mailto:227896301@qq.com">227896301@qq.com</a>
            <span className="footer__nav-note">微信: CTzl1010i</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} XiaoXin Studio. All rights reserved.</span>
          <span className="footer__made">
            Crafted with <span className="footer__heart">♥</span> & AI
          </span>
        </div>
      </div>
    </footer>
  )
}
