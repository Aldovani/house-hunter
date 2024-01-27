'use client'
import SubHeader from '@/components/SubHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Smile, Home, Bell, LockKeyhole } from 'lucide-react'

type UserTemplateProps = {
  children: React.ReactNode
}

export default function UserTemplate({ children }: UserTemplateProps) {
  const pathName = usePathname()

  return (
    <>
      <SubHeader name="Configuração">
        <Link
          href="/user/settings/profile"
          data-active={pathName === '/user/settings/profile'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Smile
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Perfil
        </Link>
        <Link
          href="/user/settings/password"
          data-active={pathName === '/user/settings/password'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <LockKeyhole
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Senha
        </Link>
        <Link
          href=""
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Home
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Imóveis
        </Link>
        <Link
          href=""
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Bell
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Notificaçoes
        </Link>
      </SubHeader>
      <div className="pl-56">{children}</div>
    </>
  )
}
