export function detectLanguage(code: string): string {
    if (code.includes('import ') || code.includes('def ') || code.includes('print(')) {
      return 'python'
    } else if (code.includes('function') || code.includes('var ') || code.includes('const ')) {
      return 'javascript'
    } else if (code.includes('public class') || code.includes('System.out.println')) {
      return 'java'
    }
    return 'plaintext'
  }
  
  export function formatNumberedPoints(text: string): string {
    const parts = text.split(/(\d+\.\s)/g)
    let formatted = ''
    let currentPoint = ''
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].match(/^\d+\.\s$/)) {
        if (currentPoint) {
          formatted += `<div class="numbered-point" data-number="${currentPoint.trim()}">${currentPoint}</div>`
        }
        currentPoint = parts[i + 1] || ''
        i++
      } else if (!parts[i].match(/^\d+\.\s$/)) {
        currentPoint += parts[i]
      }
    }
    if (currentPoint) {
      formatted += `<div class="numbered-point" data-number="${currentPoint.trim()}">${currentPoint}</div>`
    }
    return formatted
  }
  
  