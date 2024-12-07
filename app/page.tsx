import ChatInterface from '../components/ChatInterface'

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>
          <i className="fas fa-microchip"></i>
          AI Code Performance Analyzer
        </h1>
      </header>
      <ChatInterface />
    </div>
  )
}

