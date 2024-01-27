'use client'
import { useState } from 'react'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'

export function MenuHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleIsMenuOpen() {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="flex gap-2 items-center relative border border-slate-200 rounded-full p-3 px-4">
      <button onClick={handleToggleIsMenuOpen}>
        <Menu size={24} />
      </button>

      <Link href="/sign-in">
        <User size={20} />
      </Link>

      <nav
        data-is-open={isMenuOpen}
        className="transition-all data-[is-open='true']:-bottom-2 data-[is-open='true']:opacity-100 data-[is-open='true']:pointer-events-auto opacity-0 pointer-events-none shadow-sm overflow-hidden  absolute bg-slate-50 border border-slate-2 rounded-lg -bottom-4 right-0 translate-y-full"
      >
        <ul className="flex flex-col   ">
          <li>
            <Link className="pr-20 pç" href="/houses">
              Mapa
            </Link>
          </li>
          <li>
            <Link href={'/register'}>Registar-se</Link>
          </li>
          <li>
            <Link href={'/sign-in'}>Entrar</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
