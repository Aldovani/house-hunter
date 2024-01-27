'use client'
import Image from 'next/image'
import { Link } from '../ui/Link'
import { usePathname } from 'next/navigation'
import { MenuHeader } from './menu'

export function Header() {
  return (
    <header className="fixed z-50 top-0 bg-slate-50 w-full border-b border-slate-200">
      <div className="px-8 mx-auto py-4 flex justify-between items-center">
        <Link
          variant="link"
          className="text-indigo-700 text-2xl font-semibold p-0"
          href="/"
        >
          <Image
            src="/assets/imgs/logo.svg"
            width={42}
            height={42}
            alt="logo house-hunter"
          />
        </Link>

        <MenuHeader />
      </div>
    </header>
  )
}
