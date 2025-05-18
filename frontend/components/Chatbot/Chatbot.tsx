"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createBot } from "botui"
import { BotUI, BotUIMessageList, BotUIAction } from "@botui/react"
import "@botui/react/default-theme"

const MyBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const myBot = useMemo(() => createBot(), [])
  const hasStarted = useRef(false) 

  useEffect(() => {
  if (!isOpen || hasStarted.current) return
  hasStarted.current = true

  const startConversation = () => {
    myBot
      .wait({ waitTime: 500 })
      .then(() => myBot.message.add({ text: "Olá! Como posso te ajudar hoje?" }))
      .then(() => askAndRespond())
  }

  const askAndRespond = () => {
    myBot.action.set(
      {
        actionType: "text",
        placeholder: "Digite aqui..."
      },
      {}
    ).then((data) => {
      const input = data.value.toLowerCase()

      if (input.includes("ansioso") || input.includes("triste")) {
        return myBot.message
          .add({ text: "Sinto muito por isso. Quer que eu te recomende algo para ajudar?" })
          .then(() => askAndRespond())
      } else {
        return myBot.message
          .add({ text: "Legal! Me conta mais sobre isso..." })
          .then(() => askAndRespond())
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
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
          <div className="bg-blue-600 text-white px-4 py-2 font-semibold flex justify-between items-center">
            Chatbot
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <div className="p-3 flex-1 max-h-96 overflow-y-auto bg-gray-50">
            <BotUI bot={myBot}>
              <div>
                <BotUIMessageList />
              </div>

            <div>
                <BotUIAction />
            </div>

            </BotUI>
          </div>
        </div>
      )}
    </>
  )
}

export default MyBot
