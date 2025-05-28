"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createBot } from "botui"
import { BotUI, BotUIMessageList, BotUIAction } from "@botui/react"
import '../../styles/botui-custom-theme.scss'

function autoLink(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, '$1')  // Ou apenas destaque visualmente, se quiser.
}


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
        if (data.selected.value === "cvv") {
          myBot.message.add({
            text: "Você pode falar com alguém agora mesmo pelo CVV ou ligando para 188."
          })

          myBot.message.add(
            {
              links: [
                {
                  text: "🔗 Acesse o site do CVV",
                  href: "https://www.cvv.org.br",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }
              ]
            },
            { messageType: "links" }
          )

        } else if (data.selected.value === "samu") {
          myBot.message.add({
            text: "Em caso de emergência médica, ligue para o SAMU: 192."
          })

          myBot.message.add(
            {
              links: [
                {
                  text: "🔗 Veja mais sobre o SAMU",
                  href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/samu",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }
              ]
            },
            { messageType: "links" }
          )
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
            keywords: ["ansiedade", "crise de ansiedade", "pânico", "panico", "crise de pânico", "crise de panico", "ansioso"],
            response: "5 coisas que você pode ver: Olhe ao redor e nomeie 5 coisas que consegue enxergar. Pode ser qualquer coisa — a cor da parede, uma caneta, uma planta. \n4 coisas que você pode tocar: Perceba e sinta 4 objetos ou partes do seu corpo. Pode ser a textura da roupa, o apoio da cadeira, o chão sob seus pés. \n3 coisas que você pode ouvir: Preste atenção e identifique 3 sons ao seu redor. O som de um carro, o canto de um pássaro, ou até o som da sua respiração. \n2 coisas que você pode cheirar: Note 2 cheiros presentes. Se não sentir nada, pode lembrar de aromas que gosta, como café ou flores. \n\n1 coisa que você pode saborear: Foque em 1 coisa que está sentindo no paladar ou lembre-se de algum sabor agradável. Além disso, têm vários posts do PsyMeet Blog que podem te ajudar. Confira: ",
            link: {
              text: "🔗 Posts do Blog do Instituto Ame Sua Mente sobre depressão [clique aqui]",
              href: "https://www.amesuamente.org.br/conteudo/blog/depressao-blog/"
            }
          },
          {
            keywords: ["depressão", "depressao", "tristeza", "triste", "depressivo"],
            response: "Sentir-se assim não é fraqueza. Considere procurar apoio psicológico.",
            link: {
              text: "🔗 Posts do Blog do Instituto Ame Sua Mente sobre depressão [clique aqui]",
              href: "https://www.amesuamente.org.br/conteudo/blog/depressao-blog/"
            }
          },
          {
            keywords: ["estresse", "sobrecarga", "cansado", "cansaço", "exausto"],
            response: "Você merece pausas. Que tal um momento de respiração consciente ou alongamento?",
            link: {
              text: "🔗 Vídeo para meditação [clique aqui]",
              href: "https://www.youtube.com/watch?v=1MrQPZuSs7A"
            }
          },
          {
            keywords: ["insônia", "insonia", "sono ruim", "não consigo dormir"],
            response: "Uma boa rotina noturna ajuda. Evite telas antes de dormir e tente um ritual relaxante.",
            link: {
              text: "🔗 Artigo sobre sono e saúde mental [clique aqui]",
              href: "https://www.amesuamente.org.br/blog/como-a-privacao-do-sono-impacta-a-saude-mental/"
            }
          },
          {
            keywords: ["motivação", "motivacao", "desânimo", "desanimo", "sem vontade"],
            response: "Tudo bem desacelerar. Comece com metas pequenas. No PyMeet Blog, tem um post que fala justamente sobre isso, dá uma olhadinha. 💪",
            link: {
              text: "🔗 O Que Fazer Quando Você Se Sentir Desmotivado? [clique aqui]",
              href: "https://www.psymeetsocial.com/blog/artigos/o-que-fazer-quando-se-sentir-desmotivado"
            }
          },
          {
            keywords: ["terapia", "psicólogo", "psicologo", "ajuda profissional"],
            response: "Buscar terapia é um ato de coragem. Você pode encontrar ajuda em serviços públicos e privados. No Eu Sinto-me, você pode pedir ajuda para profissionais de verdade, o link logo abaixo para você fazer isso 👇",
            link: {
              text: "🔗 Quero procurar ajuda [clique aqui]",
              href: "https://eusinto.me/procurar-ajuda/procurar-ajuda/"
            }
          },
          {
            keywords: ["raiva", "irritação", "irritaçao", "irritacao", "impaciência", "impaciencia"],
            response: "Acolher e entender esse sentimento é muito importante para o autoconhecimento. O que te causou isso? No link abaixo que vou te recomendar, ele explora sobre a agressividade e violência. Inclusive, o site Eu Sinto-me é uma das nossas referências da nossa aba de Conteúdos, explore mais 🔥",
            link: {
              text: "🔗 Sobre agressividade e violência [clique aqui]",
              href: "https://eusinto.me/bem-estar-e-saude-psicologica/relacoes-e-comunidade/agressividade-e-violencia/"
            }
          },
          {
            keywords: ["autoestima", "insegurança", "inseguranca", "autoimagem"],
            response: "Você tem valor. Se acolher é um passo importante. Veja alguns desses posts do PsyMeet que podem te ajudar. Obs: na aba 'Conteúdos', recomendamos o PsyMeet, lá tem posts sobre muitos outros assuntos além desse 💖.",
            link: {
              text: "🔗 Posts do Blog PsyMeet sobre autoestima [clique aqui]",
              href: "https://www.psymeetsocial.com/blog/autoestima"
            }
          },
          {
            keywords: ["suicídio", "suicidio", "não quero mais viver", "morrer", "desistir"],
            response: "Você não está sozinho. Fale com alguém agora pelo CVV.",
            link: {
              text: "🔗 Fale com o CVV! [clique aqui]",
              href: "https://www.cvv.org.br"
            }
          }
        ]

        const matchedResponse = responses.find((r) => r.keywords.some((keyword) => input.includes(keyword)))

        if (matchedResponse) {
          myBot.message.add({ text: matchedResponse.response })

          if (matchedResponse.link) {
            myBot.message.add(
              {
                links: [
                  {
                    text: matchedResponse.link.text,
                    href: matchedResponse.link.href,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }
                ]
              },
              { messageType: "links" }
            )
          }

        } else {
          myBot.message.add({
            text: "Desculpe, não consegui entender muito bem ou talvez eu ainda não tenha sido programada para falar sobre isso. 😅 Mas estou aqui para ajudar no que puder! Quer tentar perguntar de outro jeito ou falar sobre outra coisa? 💬"
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
            SerenaChat
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <div id="bot-container" className="p-3 flex-1 bg-gray-50">
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
