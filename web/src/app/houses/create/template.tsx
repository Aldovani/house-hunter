import { ReactNode } from 'react'
import { CreateHouseProvider } from './context/CreateHouseProvider'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  return <CreateHouseProvider>{children}</CreateHouseProvider>
}
