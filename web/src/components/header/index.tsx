import Link from 'next/link'

import styles from './styles.module.scss'

import { MenuHeader } from './menu'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} href={'/map'}>
          House-Hunter
        </Link>

        <MenuHeader />
      </div>
    </header>
  )
}
