type HouseCardHeaderProps = {
  children?: React.ReactNode
}

export function HouseCardHeader({ children }: HouseCardHeaderProps) {
  return (
    <header className="w-full  relative ">
      <div className='w-full h-48  rounded-t-lg  bg-[url("/assets/imgs/house-1.png")] bg-cover'></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="hover:bg-slate-50 cursor-pointer block size-2 bg-slate-50 rounded-full"></span>
        <span className="hover:bg-slate-50 cursor-pointer block size-2 bg-slate-50/70 rounded-full"></span>
        <span className="hover:bg-slate-50 cursor-pointer block size-2 bg-slate-50/70 rounded-full"></span>
      </div>
      {children}
    </header>
  )
}
