'use client'
import SubHeader from '@/components/SubHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { User, Users, History } from 'lucide-react'

type UserTemplateProps = {
  children: React.ReactNode
}

export default function ScheduleTemplate({ children }: UserTemplateProps) {
  const pathName = usePathname()

  return (
    <>
      <SubHeader name="Agenda">
        <Link
          href="/user/schedule"
          data-active={pathName === '/user/schedule'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <User
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Visitas
        </Link>
        <Link
          href="/user/schedule/history"
          data-active={pathName === '/user/settings/password'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Users
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          visitantes
        </Link>
        <Link
          href="/user/schedule/history"
          data-active={pathName === '/user/schedule/history'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <History
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          histórico
        </Link>
      </SubHeader>
      <div className="pl-56">{children}</div>
    </>
  )
}
