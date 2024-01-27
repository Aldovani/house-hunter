'use client'
import { Edit, ExternalLink, LockKeyhole, Trash, Wrench } from 'lucide-react'
import { useState } from 'react'
import { ItemMenu } from './itemMenu'

export function MenuHouseConfig() {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenMenu() {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="group absolute  top-3 right-3">
      <button
        onClick={handleOpenMenu}
        className=" hover:brightness-75 rounded-lg  flex items-center justify-center   size-8 bg-slate-50"
      >
        <Wrench size={20} className="text-slate-900" />
      </button>
      <div
        data-is-open={isOpen}
        className="transition-all data-[is-open='true']:-bottom-2 data-[is-open='true']:opacity-100 data-[is-open='true']:pointer-events-auto opacity-0 pointer-events-none shadow-sm overflow-hidden  absolute bg-slate-50 border border-slate-2 rounded-lg -bottom-4 right-0 translate-y-full"
      >
        <ul className="p-1 flex flex-col gap-1">
          <ItemMenu href="/houses/sdas">
            <ExternalLink size={16} />
            Visualizar
          </ItemMenu>
          <ItemMenu href="/houses/edit">
            <Edit size={16} />
            Editar
          </ItemMenu>
          <ItemMenu href="?modal=open?modal-type=disable">
            <LockKeyhole size={16} />
            Desativar
          </ItemMenu>
          <ItemMenu href="?modal=open?modal-type=delete">
            <Trash size={16} />
            Deletar
          </ItemMenu>
        </ul>
      </div>
    </div>
  )
}
