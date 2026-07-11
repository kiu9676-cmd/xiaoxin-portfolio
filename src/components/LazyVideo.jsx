import { useState, useEffect, useRef } from 'react'

/**
 * 懒加载视频组件
 * - 默认不加载任何视频数据
 * - 滚动到可视区域时才加载 metadata（首帧）
 * - 可选：进入可视区域后自动播放
 */
export default function LazyVideo({ src, className, autoPlayOnView = false, muted = true, loop = false, playsInline = true }) {
  const ref = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          if (autoPlayOnView) {
            el.play().catch(() => {})
          }
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [autoPlayOnView])

  return (
    <video
      ref={ref}
      className={className}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? 'metadata' : 'none'}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
    />
  )
}
