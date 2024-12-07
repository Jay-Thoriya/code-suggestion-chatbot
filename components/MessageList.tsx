import Message from './Message'

interface MessageListProps {
  messages: Array<{
    role: string
    content: string
    isCode: boolean
    isError?: boolean
  }>
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </>
  )
}

