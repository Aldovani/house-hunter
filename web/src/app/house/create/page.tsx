import Link from 'next/link'

import styles from './styles.module.scss'
import { Principal } from './components/form/Principal'
import { Location } from './components/form/Location'
import { Contact } from './components/form/Contact'
export default function CreateHouse() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          House-Hunter
        </Link>
      </header>
      <main className={styles.container}>
      <Principal />
        <Location />
        <Contact />
      </main>

      <footer className={styles.footer}>
        <div className={styles.containerProgressBar}>
          <div className={styles.progressBar}></div>
        </div>

        <div className={styles.containerButtons}>
          <button className={styles.prev}>voltar</button>
          <button className={styles.next}>avançar</button>
        </div>
      </footer>
    </>
  )
}
