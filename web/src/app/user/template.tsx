'use client'

import { ReactNode } from 'react'

import { SideBar } from '@/components/sideBar'
import { Header } from '@/components/header'

interface DashboardTemplateProps {
  children: ReactNode
}

export default function DashboardTemplate({
  children,
}: DashboardTemplateProps) {
  return (
    <>
      <Header />
      <div className="pt-20 pl-20">
        <SideBar />
        {children}
      </div>
    </>
  )
}
