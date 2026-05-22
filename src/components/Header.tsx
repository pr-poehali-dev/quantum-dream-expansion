import { useState, useEffect, MouseEvent } from "react"
import { cn } from "../lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none",
        scrolled || mobileMenuOpen
          ? "bg-primary backdrop-blur-md py-4 top-4 left-4 right-4 rounded-2xl"
          : "bg-transparent py-4 top-0 left-0 right-0",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between md:px-[24]">
        <a href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
          <img
            src="https://cdn.poehali.dev/projects/5405e243-bb57-43f7-8527-32d908df697a/bucket/c1e12601-d5fe-41cd-88d4-48a00d235fa5.jpg"
            alt="ЦКиФ Молодёжный строительный центр"
            className="h-8 w-auto object-contain"
          />
        </a>

        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          {[
            { label: "Главная", href: "#hero" },
            { label: "Каталог", href: "#projects" },
            { label: "Доставка", href: "#services" },
            { label: "Контакты", href: "#contact" },
            { label: "О нас", href: "#about" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="hover:text-[rgb(251,146,60)] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[rgb(251,146,60)] after:transition-all after:duration-300 text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-4 text-white text-sm">
            <a href="tel:+79230200666" className="hover:text-orange-300 transition-colors font-medium tracking-wide">
              8 (923) 020-06-66
            </a>
            <a href="mailto:CKIF@mail.ru" className="hover:text-orange-300 transition-colors">
              CKIF@mail.ru
            </a>
          </div>
          <p className="text-white/50 text-xs tracking-wide">Пн–Пт 9:00–18:00 &nbsp;·&nbsp; Сб 9:00–16:00</p>
        </div>

        <button
          className="md:hidden z-50 transition-colors duration-300 text-white"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-6">
          <ul className="flex flex-col gap-6 mb-8">
            {[
              { label: "Главная", href: "#hero" },
              { label: "Каталог", href: "#projects" },
              { label: "Доставка", href: "#services" },
              { label: "Контакты", href: "#contact" },
              { label: "О нас", href: "#about" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[rgb(251,146,60)] transition-colors duration-300 text-white text-4xl font-light block"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300 mb-4"
            onClick={closeMobileMenu}
          >
            Связаться
          </a>
        </div>
      </div>
    </header>
  )
}