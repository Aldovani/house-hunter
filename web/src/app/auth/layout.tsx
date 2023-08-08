import styles from './template.module.scss'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.container}>
      <div className={styles.leftSide}>
        <Link className={styles.logo} href="/">
          House-Hunter
        </Link>

        <div className={styles.content}>{children}</div>
      </div>

      <div className={styles.rightSide}>
        <h3>
          Sua próxima <span>casa</span> esta mais próximo do que você
          <span> imagina</span>
        </h3>
      </div>
    </main>
  )
}
