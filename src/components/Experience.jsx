import { useState, useRef, useEffect } from 'react'
import './Experience.css'
import SectionBg from './SectionBg'

const EXPERIENCES = [
  { id: 1, company: '创意视觉科技', position: 'AI视觉总监', period: '2023.06 — 至今', short: '主导 AI 漫剧全流程制作体系搭建', detail: '负责公司 AI 漫剧业务线的从 0 到 1 搭建。建立标准化的 AI 创作工作流，涵盖概念生成、分镜设计、AI 绘画、动态视频生成、后期合成全链路。带领 8 人团队，完成 20+ 部商业漫剧项目交付。', achievements: ['搭建 AI 漫剧标准工作流', '20+ 商业项目成功交付', '8 人创意团队管理', '建立 AI 工具评估体系'], gradient: 'linear-gradient(135deg, #FF7A30 0%, #FFB347 100%)' },
  { id: 2, company: '星河数字传媒', position: '高级内容制作人', period: '2021.03 — 2023.05', short: '引入 AI 工具提升生产效率 300%', detail: '负责短视频与动态视觉内容的生产管理。率先在团队内引入 Midjourney、Stable Diffusion 等 AI 工具，重构内容生产流程，使单条视频制作周期从 5 天缩短至 1.5 天。', achievements: ['AI 工具链全面引入', '生产效率提升 300%', '百万级播放作品 3 条', '团队 AI 培训体系搭建'], gradient: 'linear-gradient(135deg, #FFB347 0%, #FFD56B 100%)' },
  { id: 3, company: '光影互动工作室', position: '创意策划', period: '2019.07 — 2021.02', short: '服务 50+ 品牌的视觉策划', detail: '负责品牌视觉策划与创意方案输出，服务客户涵盖科技、消费、文化领域。主导多个品牌视觉升级项目，从概念到执行全链路把控。', achievements: ['50+ 品牌合作交付', '创意方案全链路把控', '跨领域视觉设计', '品牌视觉升级项目'], gradient: 'linear-gradient(135deg, #FFD56B 0%, #FFE9A8 100%)' },
  { id: 4, company: '自由创作者', position: '独立视觉设计师', period: '2018.01 — 2019.06', short: '独立接案，积累首批作品集', detail: '以独立设计师身份接案运营，专注视觉设计与动态影像创作。服务中小企业与个人客户，完成 logo 设计、品牌视觉、短视频制作等项目。', achievements: ['独立接案全流程运营', '个人视觉风格探索', '首批作品集积累', '客户沟通与项目管理'], gradient: 'linear-gradient(135deg, #FF7A30 0%, #FFD56B 100%)' },
  { id: 5, company: '梦境工坊', position: 'AI 漫剧主创', period: '2024.01 — 至今', short: '独立打造三部爆款 AI 漫剧系列', detail: '以 AI 漫剧主创身份打造《星河旅人》《赛博之梦》《深海回响》三部漫剧系列。全流程使用 AI 工具链完成从概念到成片，作品在多平台获得千万级曝光。', achievements: ['三部漫剧系列主创', '千万级全网曝光', '个人 AI 工作流成型', '多平台内容分发'], gradient: 'linear-gradient(135deg, #FF7A30 0%, #FFD56B 100%)' },
  { id: 6, company: '未来影像实验室', position: 'AI 技术研究员', period: '2022.09 — 2023.08', short: '探索 AI 视频生成前沿技术', detail: '在实验室期间专注 AI 视频生成技术研究与落地。深度测评 Runway、Pika、Sora 等主流工具，建立 AI 视频生成能力评估矩阵。', achievements: ['AI 视频工具深度测评', '技术评估矩阵搭建', '研究成果产品化', '前沿技术追踪'], gradient: 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)' },
  { id: 7, company: '灵感社区', position: '特约讲师', period: '2023.01 — 至今', short: 'AI 创作课程累计学员 5000+', detail: '作为特约讲师在灵感社区开设 AI 漫剧创作系列课程，涵盖 AI 绘画、AI 视频生成、剧本创作等主题。课程累计学员 5000+，好评率 98%。', achievements: ['5000+ 累计学员', '98% 好评率', '系列课程开发', '教学方法论沉淀'], gradient: 'linear-gradient(135deg, #FFB347 0%, #FFE9A8 100%)' },
  { id: 8, company: '国际 AI 艺术展', position: '参展艺术家', period: '2024.10', short: 'AI 漫剧作品入选国际艺术展', detail: 'AI 漫剧作品《光阴之间》入选 2024 国际 AI 艺术展，成为首批以 AI 漫剧形式参展的独立艺术家。作品在展览期间获得广泛关注。', achievements: ['作品入选国际展览', 'AI 漫剧艺术形式认可', '多家媒体报道', '国际艺术圈曝光'], gradient: 'linear-gradient(135deg, #FF7A30 0%, #FFB347 100%)' },
]

export default function Experience() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const rotorRef = useRef(null)
  const stageRef = useRef(null)
  const lockRef = useRef(false)
  const currentRef = useRef(0)

  const total = EXPERIENCES.length
  const angleStep = 360 / total
  const rotRef = useRef(0) // 连续旋转角度，不取模

  const applyRotation = () => {
    if (rotorRef.current) {
      rotorRef.current.style.transform = `rotateY(${rotRef.current}deg)`
    }
  }

  const goTo = (direction) => {
    // 每次只转一格，连续累加，不取模
    rotRef.current -= direction * angleStep
    // 计算显示索引（取模）
    const index = ((Math.round(-rotRef.current / angleStep) % total) + total) % total
    currentRef.current = index
    setCurrent(index)
    applyRotation()
  }

  // 滚轮控制 —— 用原生事件才能 preventDefault
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onWheel = (e) => {
      e.preventDefault()
      if (lockRef.current) return
      lockRef.current = true
      setTimeout(() => { lockRef.current = false }, 450)

      if (e.deltaY > 0) {
        goTo(1)
      } else if (e.deltaY < 0) {
        goTo(-1)
      }
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  const handleCardClick = (exp) => {
    setSelected(exp)
  }

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
      if (!selected && e.key === 'ArrowLeft') goTo(-1)
      if (!selected && e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  // 初始化旋转
  useEffect(() => {
    applyRotation()
  }, [])

  return (
    <section id="experience" className="experience">
      <SectionBg variant="experience" />
      <div className="container experience__content">
        <div className="experience__header reveal">
          <span className="section-tag">Experience / 职业经历</span>
          <h2 className="section-title">
            每一步<br />
            <span className="accent">都是故事的伏笔</span>
          </h2>
          <p className="section-desc">
            从独立设计师到 AI 视觉总监，每段经历都在为下一个故事蓄力。
            滚动鼠标滚轮旋转浏览，点击卡片查看详情。
          </p>
        </div>

        {/* 3D 圆柱旋转 —— 滚轮控制 */}
        <div
          className="experience__3d-stage reveal"
          ref={stageRef}
        >
          <div className="experience__3d-rotor" ref={rotorRef}>
            {EXPERIENCES.map((exp, i) => {
              const isActive = i === current
              return (
                <div
                  key={exp.id}
                  className={`experience__3d-card ${isActive ? 'experience__3d-card--active' : ''}`}
                  style={{ '--card-angle': `${i * angleStep}deg`, '--card-z': '650px' }}
                  onClick={() => isActive && handleCardClick(exp)}
                >
                  <div className="experience__card glass">
                    <div className="experience__card-bar" style={{ background: exp.gradient }} />
                    <div className="experience__card-top">
                      <div className="experience__logo" style={{ background: exp.gradient }}>
                        {exp.company.charAt(0)}
                      </div>
                      <div className="experience__card-info">
                        <h3 className="experience__company">{exp.company}</h3>
                        <span className="experience__position">{exp.position}</span>
                      </div>
                    </div>
                    <span className="experience__period">{exp.period}</span>
                    <p className="experience__short">{exp.short}</p>
                    <div className="experience__card-footer">
                      <span>{isActive ? '点击查看详情' : ''}</span>
                      {isActive && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 滚轮提示 */}
        <div className="experience__wheel-hint reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <path d="M12 7v4" strokeLinecap="round" />
          </svg>
          <span>滚轮旋转 · {current + 1} / {total}</span>
        </div>
      </div>

      {/* —— 详情 Modal —— */}
      {selected && (
        <div className="experience__modal-overlay" onClick={() => setSelected(null)}>
          <div className="experience__modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="experience__modal-close" onClick={() => setSelected(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="experience__modal-header">
              <div className="experience__logo experience__logo--lg" style={{ background: selected.gradient }}>
                {selected.company.charAt(0)}
              </div>
              <div>
                <h3 className="experience__modal-company">{selected.company}</h3>
                <span className="experience__modal-position">{selected.position}</span>
                <span className="experience__modal-period">{selected.period}</span>
              </div>
            </div>
            <p className="experience__modal-detail">{selected.detail}</p>
            <div className="experience__modal-section-label">核心成果</div>
            <div className="experience__modal-achievements">
              {selected.achievements.map((a) => (
                <div key={a} className="experience__achievement">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
