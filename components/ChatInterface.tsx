'use client'

import { useState, useRef, useEffect } from 'react'
import MessageList from './MessageList'
import InputArea from './InputArea'
import LoadingAnimation from './LoadingAnimation'

interface Message {
  role: string
  content: string
  isCode: boolean
  isError?: boolean
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const chatMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        role: 'assistant',
        content: `Welcome! I'm your AI Code Performance Analyzer. 
               => I can help you improve your code's performance and quality. 
                1. Analyze code performance and complexity
                2. Suggest optimizations and improvements
                3. Identify potential bugs and issues
                4. Recommend best practices

                Please paste your code or ask a question to get started!`,
        isCode: false,
        isError: false
      }
    ])
  }, [])

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  const addMessage = (role: string, content: string, isCode: boolean = false, isError: boolean = false) => {
    setMessages(prevMessages => [...prevMessages, { role, content, isCode, isError }])
  }

  const handleSubmit = async (code: string) => {
    addMessage('user', code, true)
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.suggestions) {
        const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [data.suggestions]
        suggestions.forEach(suggestion => addMessage('assistant', suggestion))
      } else {
        addMessage('assistant', "I couldn't generate any suggestions for this code. Could you provide more context or a different code snippet?", false, true)
      }
    } catch (error) {
      console.error("Error:", error)
      addMessage('assistant', "I'm sorry, but I encountered an error while analyzing your code. Could you try again?", false, true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div ref={chatMessagesRef} className="chat-messages">
        <MessageList messages={messages} />
        {isLoading && <LoadingAnimation />}
      </div>
      <InputArea onSubmit={handleSubmit} />
    </div>
  )
}

