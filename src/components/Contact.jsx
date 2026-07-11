import './Contact.css'
import SectionBg from './SectionBg'

const CONTACTS = [
  {
    type: '电话',
    label: 'Phone',
    value: '191 7391 9554',
    href: 'tel:19173919554',
    icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
  },
  {
    type: '邮箱',
    label: 'Email',
    value: '227896301@qq.com',
    href: 'mailto:227896301@qq.com',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  },
  {
    type: '微信',
    label: 'WeChat',
    value: 'CTzl1010i',
    href: '#',
    icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <SectionBg variant="contact" />
      <div className="container contact__content">
        <div className="contact__wrap">
          {/* 左侧 —— 标题 */}
          <div className="contact__left reveal" data-reveal="left">
            <span className="section-tag">Contact / 联系方式</span>
            <h2 className="section-title">
              让我们一起<br />
              <span className="accent">创造下一个故事</span>
            </h2>
            <p className="section-desc">
              无论是商业合作、项目定制还是创意碰撞，
              都欢迎随时联系。每个伟大的作品，都始于一次对话。
            </p>

            <div className="contact__availability">
              <span className="contact__availability-dot" />
              当前接受新项目委托
            </div>
          </div>

          {/* 右侧 —— 联系卡片 */}
          <div className="contact__right reveal" data-reveal="right">
            {CONTACTS.map((item, i) => (
              <a
                key={item.type}
                href={item.href}
                className="contact__card glass"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="contact__card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className="contact__card-info">
                  <span className="contact__card-label">{item.label}</span>
                  <span className="contact__card-type">{item.type}</span>
                  <span className="contact__card-value">{item.value}</span>
                </div>
                <div className="contact__card-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 底部装饰光带 */}
      <div className="contact__glow" />
    </section>
  )
}
