'use client'

import { useState, useEffect } from 'react'
import { detectLanguage } from '../utils/helpers'
import { PlaneIcon as PaperPlaneIcon } from 'lucide-react'

interface InputAreaProps {
  onSubmit: (code: string) => void
}

export default function InputArea({ onSubmit }: InputAreaProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('Auto-detect')

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setCode(textarea.value);
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height with a maximum of 200px
    const maxHeight = 200;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    
    // Set the new height
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    setLanguage(detectLanguage(code))
  }, [code])

  const handleSubmit = () => {
    if (code.trim()) {
      onSubmit(code.trim())
      setCode('')
      setLanguage('Auto-detect')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <textarea
          value={code}
          onChange={handleTextareaInput}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="chat-input"
          rows={1}
        />
        <button 
          onClick={handleSubmit} 
          className="send-button"
          disabled={!code.trim()}
        >
          <div className="send-button-inner">
            <PaperPlaneIcon className="w-5 h-5" />
          </div>
        </button>
      </div>
      <div className="language-indicator">
        Language: <span>{language}</span>
      </div>
    </div>
  )
}

