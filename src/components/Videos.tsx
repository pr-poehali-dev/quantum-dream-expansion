import { Play } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const videos = [
  {
    id: 1,
    title: "Монтаж ондулина",
    description: "Пошаговая инструкция по укладке ондулина на крышу",
    duration: "12:34",
    url: "#",
  },
  {
    id: 2,
    title: "Монтаж металлопрофиля",
    description: "Как правильно крепить металлопрофиль на кровлю",
    duration: "15:20",
    url: "#",
  },
  {
    id: 3,
    title: "Сборка теплицы",
    description: "Инструкция по сборке теплицы из поликарбоната",
    duration: "18:45",
    url: "#",
  },
  {
    id: 4,
    title: "Укладка ондувиллы",
    description: "Монтаж декоративной черепицы ондувилла своими руками",
    duration: "10:15",
    url: "#",
  },
  {
    id: 5,
    title: "Работа с цементом",
    description: "Правила замешивания и заливки цементного раствора",
    duration: "08:50",
    url: "#",
  },
  {
    id: 6,
    title: "Фасадная отделка",
    description: "Технология нанесения декоративной штукатурки на фасад",
    duration: "14:10",
    url: "#",
  },
]

export function Videos() {
  return (
    <section id="videos" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Обучение</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            Видео <HighlightedText>инструкции</HighlightedText>
            <br />
            по монтажу
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Наши специалисты записали подробные видеоуроки по монтажу всех основных материалов. Всё понятно и наглядно.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              className="group block border border-border hover:border-foreground/30 transition-all duration-300"
            >
              {/* Превью */}
              <div className="relative bg-secondary aspect-video flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-foreground/10 group-hover:bg-orange-500 flex items-center justify-center transition-colors duration-300">
                  <Play className="w-6 h-6 text-foreground group-hover:text-white ml-1" strokeWidth={1.5} />
                </div>
                <span className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-0.5 rounded-sm">
                  {video.duration}
                </span>
              </div>

              {/* Текст */}
              <div className="p-5">
                <h3 className="text-base font-medium mb-1 group-hover:underline underline-offset-4">{video.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{video.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
