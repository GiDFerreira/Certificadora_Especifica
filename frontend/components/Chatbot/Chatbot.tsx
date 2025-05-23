"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createBot } from "botui"
import { BotUI, BotUIMessageList, BotUIAction } from "@botui/react"
import '../../styles/botui-custom-theme.scss'

const MyBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  const myBot = useMemo(() => {
    if (!isOpen) return null
    return createBot()
  }, [isOpen])

  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isOpen || !myBot || hasStarted.current) return
    hasStarted.current = true

    const startConversation = () => {
      myBot
        .wait({ waitTime: 500 })
        .then(() =>
          myBot.message.add({ text: "Olá! Como posso te ajudar hoje?" })
        )
        .then(() =>
          myBot.action.set(
            {
              options: [
                { label: "Falar com o CVV", value: "cvv" },
                { label: "Chamar o SAMU", value: "samu" },
                { label: "Só quero conversar", value: "conversar" }
              ]
            },
            { actionType: 'selectButtons' }
          )
        )
        .then((data) => {
          debugger
          if (data.selected.value === "cvv") {
            myBot.message.add({
              text: "Você pode falar com alguém agora mesmo pelo CVV: https://www.cvv.org.br ou ligando para 188. 💛",
            })
          } else if (data.selected.value === "samu") {
            myBot.message.add({
              text: "Em caso de emergência médica, ligue para o SAMU: 192. Veja mais em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/samu",
            })
          }
          askAndRespond()
        })
    }

    const askAndRespond = () => {
      myBot.action
        .set({ actionType: "text", placeholder: "Digite aqui..." }, {})
        .then((data) => {
          const input = data.value.toLowerCase()

          const responses = [
            {
              keywords: ["ansiedade", "crise de ansiedade", "pânico", "crise de pânico", "ansioso"],
              response:
                "Vamos passar por isso juntos. Respire fundo, inspire pelo nariz contando até 4, segure por 4, expire pela boca contando até 4. Isso ajuda a acalmar. Sua experiência é válida. 💙",
            },
            {
              keywords: ["depressão", "tristeza"],
              response:
                "Sentir-se assim não é fraqueza. Considere procurar apoio psicológico. Recomendamos os conteúdos do blog do Instituto Ame Sua Mente para te ajudar: https://www.amesuamente.org.br/conteudo/blog/depressao-blog/ ❤️. Além disso, explore a nossa tela de 'Conteúdos' para mais dicas e recursos sobre saúde mental. 💡",
            },

            {
              keywords: ["estresse", "sobrecarga", "cansado", "exausto"],
              response:
                "Você merece pausas. Que tal um momento de respiração consciente ou alongamento? Veja esse vídeo para te ajudar a meditar: https://www.youtube.com/watch?v=1MrQPZuSs7A. Inclusive, ele está lá na nossa aba de 'Conteúdos', quando tiver um tempo, dá uma olhadinha mais a fundo ;)",
            },
            {
              keywords: ["insônia", "sono ruim", "não consigo dormir"],
              response:
                "Uma boa rotina noturna ajuda. Evite telas antes de dormir e tente um ritual relaxante. Temos esse artigo do Instituto Ame sua Mente: https://www.amesuamente.org.br/blog/como-a-privacao-do-sono-impacta-a-saude-mental/. Além disso, explore a nossa tela de 'Conteúdos' para mais dicas e recursos sobre saúde mental. 💡",
            },
            {
              keywords: ["motivação", "desânimo", "sem vontade"],
              response:
                "Tudo bem desacelerar. Comece com metas pequenas. Temos conteúdos motivacionais na aba 'Conteúdos'. Você consegue. 💪",
            },
            {
              keywords: ["terapia", "psicólogo", "ajuda profissional"],
              response:
                "Buscar terapia é um ato de coragem. Você pode encontrar ajuda em serviços públicos e privados. Veja: https://www.cvv.org.br/como-ajudar/ 💼",
            },
            {
              keywords: ["raiva", "irritação", "impaciência"],
              response:
                "Pausas curtas e respiração profunda ajudam. Você pode também escrever o que sente. Veja conteúdos sobre emoções na aba 'Conteúdos'. 🔥",
            },
            {
              keywords: ["autoestima", "insegurança", "autoimagem"],
              response:
                "Você tem valor. Se acolher é um passo importante. Veja conteúdos que podem fortalecer sua autoestima na aba 'Conteúdos'. 💖",
            },
            {
              keywords: ["suicídio", "não quero mais viver", "desistir"],
              response:
                "Você não está sozinho. Fale com alguém agora pelo CVV: https://www.cvv.org.br ou ligue 188. Sua vida importa. Estamos com você. 🙏",
              emergency: true,
            },
          ]

          const matchedResponse = responses.find((r) =>
            r.keywords.some((keyword) => input.includes(keyword))
          )

          if (matchedResponse) {
            myBot.message.add({ text: matchedResponse.response })
            if (!matchedResponse.emergency) {
              askAndRespond()
            }
          } else {
            myBot.message.add({
              text: "Obrigada por compartilhar. Me fale mais se quiser. 💬",
            })
            askAndRespond()
          }
        })
    }

    startConversation()
  }, [isOpen, myBot])

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) hasStarted.current = false
        }}
        style={{ backgroundColor: "#4F729A" }}
        className="fixed bottom-4 right-4 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50"
      >
        💬
      </button>

      {isOpen && myBot && (
        <div className="fixed bottom-20 right-4 bg-white border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
          <div
            style={{ backgroundColor: "#4F729A" }}
            className="text-white px-4 py-2 font-semibold flex justify-between items-center"
          >
            Chatbot
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <div className="p-3 flex-1 bg-gray-50">
            {myBot && (
              <BotUI bot={myBot}>
                <BotUIMessageList />
                <BotUIAction />
              </BotUI>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MyBot
