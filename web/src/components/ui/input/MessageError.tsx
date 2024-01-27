type MessageErrorProps = {
  message: string | undefined
}

export function MessageError({ message }: MessageErrorProps) {
  return <p className="text-sm text-rose-700 mt-1">{message}</p>
}
