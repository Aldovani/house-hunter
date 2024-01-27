import Link from 'next/link'

type LinkItemProps = {
  href: string
  isActive: boolean
  children: React.ReactNode
  title?: string
}

export function LinkItem({ href, isActive, children, title }: LinkItemProps) {
  return (
    <Link
      href={href}
      title={title}
      data-isActive={isActive}
      className=" transition-all ease-in group relative p-2 text-slate-400 data-[isActive='true']:bg-indigo-700/5 data-[isActive='true']:text-indigo-700 hover:bg-indigo-700/5 hover:text-indigo-700 rounded-lg  block"
    >
      {children}
    </Link>
  )
}
