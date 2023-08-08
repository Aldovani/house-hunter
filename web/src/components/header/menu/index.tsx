'use client'
import { useState } from 'react'
import { FiMenu, FiUser } from 'react-icons/fi'
import styles from './styles.module.scss'
import Link from 'next/link'

export function MenuHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleIsMenuOpen() {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <nav
      className={styles.container}
      onMouseLeave={() => {
        if (isMenuOpen) handleToggleIsMenuOpen()
      }}
    >
      <button onClick={handleToggleIsMenuOpen}>
        <FiMenu size={24} />
      </button>

      <Link href="/auth/login" data-sass-classname="user">
        <FiUser size={20} />
      </Link>

      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <Link href={'/maps'}>Mapa</Link>
          </li>
          <li>
            <Link href={'/auth/register'}>Registar-se</Link>
          </li>
          <li>
            <Link href={'/auth/login'}>Entrar</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
