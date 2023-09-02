interface Message {
  text: string
  link: string
  type: 'success' | 'error' | ' info'
}
interface ToastMessageProps {
  message: Message
}

export function ToastMessage() {
  return <div></div>
}
