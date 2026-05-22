import { useEffect, useRef, useState } from "react"
import { Truck, Clock, MapPin, Package } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const deliveryZones = [
  {
    zone: "Зона 1",
    area: "В пределах города",
    time: "В день заказа",
    price: "от 500 ₽",
    color: "bg-orange-100",
  },
  {
    zone: "Зона 2",
    area: "До 30 км от города",
    time: "1–2 рабочих дня",
    price: "от 1 200 ₽",
    color: "bg-stone-100",
  },
  {
    zone: "Зона 3",
    area: "30–100 км от города",
    time: "2–3 рабочих дня",
    price: "от 2 500 ₽",
    color: "bg-stone-100",
  },
  {
    zone: "Индивидуально",
    area: "Более 100 км",
    time: "По согласованию",
    price: "Рассчитаем",
    color: "bg-stone-100",
  },
]

const features = [
  {
    icon: Truck,
    title: "Собственный автопарк",
    description: "Грузовики разной грузоподъёмности: от 1.5 до 20 тонн. Доставим как мешок цемента, так и целую фуру.",
  },
  {
    icon: Clock,
    title: "Работаем 7 дней в неделю",
    description: "Принимаем заявки с 8:00 до 20:00. Срочная доставка в течение 3 часов — по отдельному запросу.",
  },
  {
    icon: MapPin,
    title: "Разгрузка на объекте",
    description: "Привезём и выгрузим в нужное место. Доступна услуга подъёма материалов на этаж.",
  },
  {
    icon: Package,
    title: "Сохранность груза",
    description: "Материалы надёжно закреплены и укрыты от осадков. Принимаете товар только в целости и сохранности.",
  },
]

export function Delivery() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [visibleZones, setVisibleZones] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const zoneRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          const type = entry.target.getAttribute("data-type")
          if (entry.isIntersecting) {
            if (type === "feature") {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            } else {
              setVisibleZones((prev) => [...new Set([...prev, index])])
            }
          }
        })
      },
      { threshold: 0.15 },
    )

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    zoneRefs.current.forEach((ref) => ref && observer.observe(ref))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Доставка материалов</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            Привезём <HighlightedText>прямо</HighlightedText>
            <br />
            на объект
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Собственный автопарк и опытные водители. Доставляем строительные материалы точно в срок — чтобы стройка не останавливалась.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {deliveryZones.map((zone, index) => (
            <div
              key={zone.zone}
              ref={(el) => { zoneRefs.current[index] = el }}
              data-index={index}
              data-type="zone"
              className={`p-6 transition-all duration-700 ${
                visibleZones.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms`, backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{zone.zone}</p>
              <h3 className="text-lg font-medium mb-2">{zone.area}</h3>
              <div className="flex flex-col gap-1 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Срок</span>
                  <span className="font-medium">{zone.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Стоимость</span>
                  <span className="font-medium text-orange-500">{zone.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                data-type="feature"
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Icon className="w-8 h-8 mb-4 text-foreground" strokeWidth={1.25} />
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
