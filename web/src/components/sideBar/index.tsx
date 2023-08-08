'use client'
import Link from 'next/link'
import Image from 'next/image'

import styles from './styles.module.scss'
import { usePathname } from 'next/navigation'
import { DashboardUrl } from '@/app/dashboard/template'

export function SideBar() {
  const pathName = usePathname().split('/')[2] as DashboardUrl

  const icons = {
    user: {
      normal: '/assets/icons/smile.svg',
      active: '/assets/icons/smile-active.svg',
    },
    schedule: {
      normal: '/assets/icons/calendar.svg',
      active: '/assets/icons/calendar-active.svg',
    },
    properties: {
      normal: '/assets/icons/home.svg',
      active: '/assets/icons/home-active.svg',
    },
  }

  return (
    <aside className={styles.container}>
      <Link href="/dashboard/user">
        <Image
          alt="user icon"
          width={32}
          height={32}
          src={pathName === 'user' ? icons.user.active : icons.user.normal}
        />
      </Link>
      <Link href="/dashboard/schedule">
        <Image
          alt="schedule icon"
          width={32}
          height={32}
          src={
            pathName === 'schedule'
              ? icons.schedule.active
              : icons.schedule.normal
          }
        />
      </Link>
      <Link href="/dashboard/properties">
        <Image
          alt="home icons"
          width={32}
          height={32}
          src={
            pathName === 'properties'
              ? icons.properties.active
              : icons.properties.normal
          }
        />
      </Link>
    </aside>
  )
}
