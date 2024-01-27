type SubHeaderProps = {
  children: React.ReactNode
  name: string
}

export default function SubHeader({ children, name }: SubHeaderProps) {
  return (
    <div className=" h-[calc(100vh_-_75px)] top-[75px] pt-6 w-52 border-r border-slate-200 fixed bg-slate-50 px-5 left-[97px] ">
      <div className="flex justify-between items-center">
        <span className="uppercase tracking-[3px] font-medium text-slate-400 text-sm">
          {name}
        </span>
        <span className="w-3 h-[2px] bg-slate-300"></span>
      </div>

      <nav className="flex flex-col gap-3 mt-6">{children}</nav>
    </div>
  )
}
