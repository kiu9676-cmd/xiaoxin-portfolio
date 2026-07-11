import './About.css'

const SKILLS = [
  { name: 'AI 绘画生成', level: 'Midjourney · Stable Diffusion · DALL·E', icon: '🎨' },
  { name: 'AI 视频制作', level: 'Runway · Pika · Sora · Kling', icon: '🎬' },
  { name: '剧本与分镜', level: 'ChatGPT · Claude · 故事架构', icon: '✍️' },
  { name: '后期与特效', level: 'AE · Premiere · DaVinci', icon: '✨' },
]

const FEATURES = [
  {
    title: 'AI 驱动创作',
    desc: '以 AI 为核心引擎，从概念到成片全流程智能化，效率提升 10 倍。',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: '电影级叙事',
    desc: '每一帧都经过精心设计，用电影语言讲述动人的故事。',
    icon: 'M7 4V2h10v2h3v2l-2 14H6L4 6V4h3zM9 6v2h6V6H9z',
  },
  {
    title: '风格多变',
    desc: '从赛博朋克到水墨国风，从写实到二次元，驾驭多种视觉风格。',
    icon: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z',
  },
  {
    title: '极速交付',
    desc: '传统团队数周的项目，AI 工作流可在数天内高质量交付。',
    icon: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z',
  },
]

export default function About() {
  return (
    <section id="about" className="about">
      {/* —— 全局视频背景层 —— */}
      <div className="about__bg">
        <video className="about__bg-video" autoPlay muted loop playsInline>
          <source src="/videos/about-bg.mp4" type="video/mp4" />
        </video>
        <div className="about__bg-orb about__bg-orb--1" />
        <div className="about__bg-orb about__bg-orb--2" />
      </div>

      <div className="container">
        {/* 标题区 */}
        <div className="about__header reveal" data-reveal="blur">
          <span className="section-tag">About / 角色介绍</span>
          <h2 className="section-title">
            不只是创作者<br />
            更是 <span className="accent">故事的导演</span>
          </h2>
          <p className="section-desc">
            我是 XiaoXin，一名 AI 漫剧制作师。用人工智能技术重新定义视觉叙事，
            将想象力转化为可感知的影像艺术。每一部作品，都是技术与创意的精密交汇。
          </p>
        </div>

        {/* 主体内容 */}
        <div className="about__body">
          {/* 左侧 —— 个人卡片 */}
          <div className="about__card glass reveal" data-reveal="left">
            <div className="about__card-top">
              <div className="about__avatar">
                <div className="about__avatar-ring" />
                <div className="about__avatar-core">
                  <span>X</span>
                </div>
              </div>
              <div className="about__card-info">
                <h3>XiaoXin</h3>
                <p>AI Comic Drama Creator</p>
                <div className="about__tags">
                  <span className="about__tag">AI漫剧</span>
                  <span className="about__tag">视觉叙事</span>
                  <span className="about__tag">创意技术</span>
                </div>
              </div>
            </div>

            <div className="about__card-divider" />

            <div className="about__skills">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="about__skill">
                  <span className="about__skill-icon">{skill.icon}</span>
                  <div>
                    <div className="about__skill-name">{skill.name}</div>
                    <div className="about__skill-level">{skill.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧 —— 特性卡片 */}
          <div className="about__features">
            {FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="about__feature glass reveal"
                data-reveal="right"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="about__feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d={feat.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* —— 创作流程 —— */}
        <div className="about__flow reveal">
          <div className="about__flow-title">
            <span className="section-tag">Workflow / 创作流程</span>
          </div>
          <div className="about__flow-steps">
            {[
              { step: '01', title: '概念构思', desc: 'AI 辅助故事脑暴与世界观构建' },
              { step: '02', title: '剧本分镜', desc: '生成剧本与分镜脚本，确定视觉基调' },
              { step: '03', title: 'AI 生成', desc: '角色设计、场景生成、动态画面制作' },
              { step: '04', title: '后期合成', desc: '剪辑、配乐、特效与最终调色输出' },
            ].map((s, i) => (
              <div key={s.step} className="about__flow-step" style={{ '--step-index': i }}>
                <span className="about__flow-num">{s.step}</span>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
