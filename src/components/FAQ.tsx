import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Есть ли у вас минимальный объём заказа?",
    answer:
      "Нет, мы работаем как с розничными покупателями, так и с крупными строительными компаниями. Можно купить как один мешок цемента, так и целую фуру материалов. Для оптовых заказов действуют специальные условия.",
  },
  {
    question: "Как быстро вы доставляете материалы?",
    answer:
      "При наличии товара на складе доставка осуществляется в день заказа или на следующий рабочий день. Для крупных объёмов согласовываем удобное время разгрузки. Работаем 7 дней в неделю.",
  },
  {
    question: "Можно ли получить скидку при большом объёме?",
    answer:
      "Да, для строительных организаций и постоянных клиентов предусмотрена система скидок. Чем больше объём — тем выгоднее условия. Также возможна отсрочка платежа для юридических лиц.",
  },
  {
    question: "Как убедиться в качестве материалов?",
    answer:
      "На все материалы имеются сертификаты соответствия и декларации. По запросу предоставляем техническую документацию. Также можно приехать на склад и лично осмотреть товар перед покупкой.",
  },
  {
    question: "Работаете ли вы с юридическими лицами?",
    answer:
      "Да, мы работаем как с физическими, так и с юридическими лицами. Для компаний оформляем полный пакет документов: счёт, накладная, счёт-фактура. Возможна оплата по безналичному расчёту.",
  },
  {
    question: "Как сделать заказ?",
    answer:
      "Позвоните нам или оставьте заявку на сайте — менеджер перезвонит в течение 15 минут. Поможем рассчитать нужный объём, подберём материалы под ваш проект и согласуем доставку.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}