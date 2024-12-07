import { useEffect, useRef } from 'react'
import { detectLanguage } from '../utils/helpers'
import CodeBlock from './CodeBlock'

interface MessageProps {
  role: string
  content: string | object
  isCode: boolean
  isError?: boolean
}

export default function Message({ role, content, isCode, isError }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add('show')
    }
  }, [])

  const formatContent = (content: string | object) => {
    // If content is an object, stringify it properly
    if (typeof content === 'object') {
      return JSON.stringify(content, null, 2)
    }

    const paragraphs = content.split(/\n\n+/) // Split content by paragraphs
    return paragraphs.map(paragraph => {
      if (paragraph.includes('```')) {
        // Check for code blocks
        const parts = paragraph.split(/```(\w+)\n([\s\S]*?)```/g)
        let formatted = ''

        for (let i = 0; i < parts.length; i++) {
          if (i % 3 === 0) {
            // Regular text
            if (parts[i].trim()) {
              const points = parts[i].split(/(?=\d+\.\s)/)
              formatted += points.map(point => 
                point.trim() ? `<div class="text-point">${point}</div>` : ''
              ).join('')
            }
          } else if (i % 3 === 1) {
            // Language identifier (skip)
            continue
          } else {
            // Code block
            const language = parts[i - 1]
            formatted += `<div class="code-block-wrapper">
              <div class="code-block">
                <div class="code-header">
                  <span>${language}</span>
                </div>
                <div class="code-content">
                  <pre><code class="language-${language}">${parts[i]}</code></pre>
                </div>
              </div>
            </div>`
          }
        }
        return `<div class="content-paragraph">${formatted}</div>`
      } else {
        // Regular paragraph - split by numbered points
        const points = paragraph.split(/(?=\d+\.\s)/)
        const formatted = points.map(point => 
          point.trim() ? `<div class="text-point">${point}</div>` : ''
        ).join('')
        return `<div class="content-paragraph">${formatted}</div>`
      }
    }).join('')
   }

  return (
    <div ref={messageRef} className={`message ${role} ${isError ? 'error' : ''}`}>
      <div className="message-content">
        {isCode ? (
          <CodeBlock 
            code={typeof content === 'object' ? JSON.stringify(content, null, 2) : content.toString()} 
            language={detectLanguage(typeof content === 'object' ? 'json' : content.toString())}
            showCopy={true} // Allow copy functionality for code
          />
        ) : (
          <div 
            className="suggestion-wrapper"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }} 
          />
        )}
      </div>
    </div>
  )
}
