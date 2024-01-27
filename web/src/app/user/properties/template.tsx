'use client'
import SubHeader from '@/components/SubHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Home, Archive, AlertCircle, PlusCircle, Ban } from 'lucide-react'

type UserTemplateProps = {
  children: React.ReactNode
}

export default function PropertiesTemplate({ children }: UserTemplateProps) {
  const pathName = usePathname()

  return (
    <>
      <SubHeader name="Imoveis">
        <Link
          href="/user/properties"
          data-active={pathName === '/user/properties'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Home
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Anunciados
        </Link>
        <Link
          href="/user/properties/saved"
          data-active={pathName === '/user/properties/saved'}
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Archive
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Salvos
        </Link>
        <Link
          href="/user/properties/saved"
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <AlertCircle
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Finalizar
        </Link>
        <Link
          href="/houses/create"
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <PlusCircle
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Adicionar
        </Link>
        <Link
          href=""
          className="group/active hover:bg-indigo-700/5 hover:text-indigo-700 transition-all data-[active='true']:bg-indigo-700/5 data-[active='true']:text-indigo-700 rounded-lg flex items-center gap-4 px-3 py-2 text-slate-400 font-medium"
        >
          <Ban
            size={20}
            className="group-hover/active:text-indigo-700 group-data-[active='true']/active:text-indigo-700 text-slate-500"
          />
          Desativadas
        </Link>
      </SubHeader>
      <div className="pl-56">{children}</div>
    </>
  )
}
