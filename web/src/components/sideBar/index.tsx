import Link from 'next/link'
import { Settings, Calendar, MessageCircle, Home, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { LinkItem } from './LinkItem'

const paths = [
  { href: '/user/settings/profile', name: 'Configuração' },
  { href: '/user/schedule', name: 'Agenda' },
  { href: '/user/chat', name: 'Chat' },
  { href: '/user/properties', name: 'Imoveis' },
]

export function SideBar() {
  const pathName = usePathname().split('/')[2]

  return (
    <aside className="h-[calc(100vh_-_75px)] bg-slate-50 border-r fixed left-0 top-[75px] p-6 border-slate-200 ">
      <nav className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          {paths.map((path) => (
            <LinkItem
              key={path.name}
              href={path.href}
              title={path.name}
              isActive={path.href.includes(pathName)}
            >
              <>
                {path.href.includes('settings') && <Settings size={32} />}
                {path.href.includes('schedule') && <Calendar size={32} />}
                {path.href.includes('chat') && <MessageCircle size={32} />}
                {path.href.includes('properties') && <Home size={32} />}
              </>
            </LinkItem>
          ))}
        </div>

        <Link
          href="/sign-in"
          className="hover:bg-indigo-700/5 hover:text-indigo-700 p-2 text-slate-400 data-[isActive='true']:bg-indigo-700/5 data-[isActive='true']:text-indigo-700 rounded-lg  block"
        >
          <LogOut size={32} />
        </Link>
      </nav>
    </aside>
  )
}
