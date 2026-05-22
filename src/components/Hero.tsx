import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const accumulatedScrollRef = useRef(0)
  const touchStartY = useRef<number>(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTopOfPage = window.scrollY === 0

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress >= 1) {
          setAnimationComplete(true)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      } else if (atTopOfPage && animationComplete && e.deltaY < 0) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress < 1) {
          setAnimationComplete(false)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTopOfPage = window.scrollY === 0
      const currentTouchY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentTouchY

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress >= 1) {
          setAnimationComplete(true)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      } else if (atTopOfPage && animationComplete && deltaY < 0) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))

        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)

        if (newProgress < 1) {
          setAnimationComplete(false)
        }

        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }

      lastTouchY.current = currentTouchY
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [animationComplete])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое фото */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/5405e243-bb57-43f7-8527-32d908df697a/files/0285ef41-98ae-4b92-ac89-75ed9b276201.jpg"
          alt="Строительные материалы: ондулин, металлопрофиль, теплица, цемент, ондувилла"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Градиент для читаемости */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />

      <div
        ref={contentRef}
        className="container mx-auto px-6 md:px-12 relative z-20 pb-0 pl-6 pr-6 pt-8 md:pt-0"
        style={{
          willChange: "transform",
          transform: "translateY(0px)",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-orange-300 mb-4">{"ЦКиФ · Молодёжный строительный центр"}</p>

          <h1
            ref={titleRef}
            className="text-6xl font-medium text-balance text-center text-white mb-6 tracking-tight leading-[0.95] lg:text-8xl"
          >
            {"Всё для вашей"}
            <br />
            <span className="text-orange-300">{"стройки"}</span>
          </h1>

          <p className="text-center text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Более 5&nbsp;000 наименований в&nbsp;наличии. Доставка в&nbsp;день заказа. Работаем с&nbsp;частными и&nbsp;корпоративными заказчиками.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 text-sm tracking-wide transition-colors duration-300"
            >
              Смотреть каталог
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white/80 text-white px-7 py-3 text-sm tracking-wide transition-colors duration-300"
            >
              Получить консультацию
            </a>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-3xl mx-auto">
          {[
            { value: "5 000+", label: "Наименований" },
            { value: "10 лет", label: "На рынке" },
            { value: "В день", label: "Доставка" },
            { value: "7 / 7", label: "Работаем" },
          ].map((stat) => (
            <div key={stat.label} className="bg-black/40 backdrop-blur-sm px-6 py-5 text-center">
              <p className="text-2xl font-medium text-white mb-1">{stat.value}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {animationComplete && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <ArrowDown className="w-5 h-5 text-white/50" />
        </div>
      )}
    </section>
  )
}