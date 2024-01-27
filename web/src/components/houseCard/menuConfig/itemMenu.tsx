import Link from 'next/link'

type ItemMenuProps = {
  children: React.ReactNode
  href: string
}

export function ItemMenu({ children, href }: ItemMenuProps) {
  return (
    <li className="peer rounded-lg px-2 py-1 text-sm text-slate-400  hover:bg-slate-200 bg-slate-50  hover:text-indigo-700  ">
      <Link href={href} className="flex items-center gap-2">
        {children}
      </Link>
    </li>
  )
}
