import { Bath, BedDouble, CarFront } from 'lucide-react'

type HouseCardBodyProps = {
  name: string
  address: string
  price?: number
}

export function HouseCardBody() {
  return (
    <main className="border rounded-b-lg border-slate-200 border-t-0 pb-6 pt-2 px-3">
      <span className="text-slate-400 text-xs">Casa</span>
      <h3 className="text-slate-900 font-semibold text-xl mt-1">
        Chácara do seu tadeu
      </h3>
      <p className="lowercase text-slate-400 text-xs mt-1">
        av antonio macek - MATÃO - sÃO PAULO
      </p>

      <div className="flex max-xl:gap-6 gap-4 items-center mt-4 ">
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <BedDouble size={20} className="text-indigo-700" />3 quartos
        </span>
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <Bath size={20} className="text-indigo-700" />2 banheiros
        </span>
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <CarFront size={20} className="text-indigo-700" />1 vaga
        </span>
      </div>
    </main>
  )
}
