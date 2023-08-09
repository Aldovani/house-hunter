import Link from 'next/link'
import { FiCalendar, FiHome, FiSmile } from 'react-icons/fi'

import styles from './styles.module.scss'
import { usePathname } from 'next/navigation'

export function SideBar() {
  const pathName = usePathname().split('/')

  return (
    <aside className={styles.container}>
      <Link href="/dashboard/user" title="User">
        <FiSmile
          size={32}
          color={pathName.includes('user') ? '#2563EB' : '#94A3B8'}
        />
      </Link>
      <Link href="/dashboard/schedule" title="schedule">
        <FiCalendar
          size={32}
          color={pathName.includes('schedule') ? '#2563EB' : '#94A3B8'}
        />
      </Link>
      <Link href="/dashboard/properties" title="properties">
        <FiHome
          size={32}
          color={pathName.includes('properties') ? '#2563EB' : '#94A3B8'}
        />
      </Link>
    </aside>
  )
}
