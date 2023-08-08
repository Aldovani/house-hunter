'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import Header from '@/components/header'
import { SideBar } from '@/components/sideBar'

import styles from './styles.module.scss'

interface DashboardTemplateProps {
  children: ReactNode
}

export type DashboardUrl = 'user' | 'schedule' | 'properties'

export default function DashboardTemplate({
  children,
}: DashboardTemplateProps) {
  const pathName = usePathname().split('/')[2] as DashboardUrl

  const routes = {
    user: {
      title: 'Perfil',
    },
    schedule: {
      title: 'Agenda',
    },
    properties: {
      title: 'Imoveis',
    },
  }

  const router = routes[pathName].title

  return (
    <>
      <Header />
      <div className={styles.container}>
        <SideBar />
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{router}</h1>
            <p className={styles.description}>
              Jorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
