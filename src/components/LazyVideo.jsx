import { useState, useEffect, useRef } from 'react'

/**
 * 懒加载视频组件
 * - 默认不加载任何视频数据
 * - 滚动到可视区域时才加载 metadata（首帧）
 * - 加载完成后自动显示第一帧画面
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
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 加载完成后显示首帧
  useEffect(() => {
    const el = ref.current
    if (!el || !shouldLoad) return

    const onLoadedData = () => {
      // 确保显示第一帧
      try {
        el.currentTime = 0
      } catch (e) {}
      if (autoPlayOnView) {
        el.play().catch(() => {})
      }
    }

    el.addEventListener('loadeddata', onLoadedData)
    return () => el.removeEventListener('loadeddata', onLoadedData)
  }, [shouldLoad, autoPlayOnView])

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
