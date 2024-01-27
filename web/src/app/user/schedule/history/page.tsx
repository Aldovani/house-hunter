import Link from 'next/link'
import { Clock, MapPin, ExternalLink } from 'lucide-react'

export default function History() {
  return (
    <main>
      <header className="border-b border-slate-200">
        <div className="pl-10 py-8">
          <h2 className="font-medium text-2xl text-slate-900">Histórico</h2>
        </div>
      </header>

      <section>
        <div className="pl-10 py-8">
          <div className="">
            <span className="font-medium text-xl  text-slate-400 tracking-[4px] uppercase">
              Novembro
            </span>

            <ul className="[&>*]:mt-4">
              <li className="py-4 pr-6 flex gap-8  items-center border border-slate-200 rounded-lg max-w-3xl">
                <div className="flex flex-col items-center px-7 relative after:absolute after:w-[1px] after:h-full after:bg-slate-200 after:right-0 after:top-1/2 after:-translate-y-1/2">
                  <span className="text-lg font-medium text-slate-900">
                    Qua
                  </span>
                  <h4 className="text-[2rem] font-bold text-slate-900">12</h4>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <p className="flex items-center text-slate-400 gap-2">
                      <Clock size={20} />
                      09:00-10:00
                    </p>

                    <Link
                      href="/house/:id"
                      className="flex items-center text-slate-400 gap-2"
                    >
                      <ExternalLink size={20} />
                      visualizar imovel
                    </Link>
                  </div>
                  <p className="flex items-center text-slate-400 gap-2">
                    <MapPin size={20} />
                    São Lourenço do Turvo, Matão-São paulo
                  </p>
                </div>
              </li>

              <li className="py-4 pr-6 flex gap-8  items-center border border-slate-200 rounded-lg max-w-3xl">
                <div className="flex flex-col items-center px-7 relative after:absolute after:w-[1px] after:h-full after:bg-slate-200 after:right-0 after:top-1/2 after:-translate-y-1/2">
                  <span className="text-lg font-medium text-slate-900">
                    Qua
                  </span>
                  <h4 className="text-[2rem] font-bold text-slate-900">12</h4>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <p className="flex items-center text-slate-400 gap-2">
                      <Clock size={20} />
                      09:00-10:00
                    </p>

                    <Link
                      href="/house/:id"
                      className="flex items-center text-slate-400 gap-2"
                    >
                      <ExternalLink size={20} />
                      visualizar imovel
                    </Link>
                  </div>
                  <p className="flex items-center text-slate-400 gap-2">
                    <MapPin size={20} />
                    São Lourenço do Turvo, Matão-São paulo
                  </p>
                </div>
              </li>

              <li className="py-4 pr-6 flex gap-8  items-center border border-slate-200 rounded-lg max-w-3xl">
                <div className="flex flex-col items-center px-7 relative after:absolute after:w-[1px] after:h-full after:bg-slate-200 after:right-0 after:top-1/2 after:-translate-y-1/2">
                  <span className="text-lg font-medium text-slate-900">
                    Qua
                  </span>
                  <h4 className="text-[2rem] font-bold text-slate-900">12</h4>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <p className="flex items-center text-slate-400 gap-2">
                      <Clock size={20} />
                      09:00-10:00
                    </p>

                    <Link
                      href="/house/:id"
                      className="flex items-center text-slate-400 gap-2"
                    >
                      <ExternalLink size={20} />
                      visualizar imovel
                    </Link>
                  </div>
                  <p className="flex items-center text-slate-400 gap-2">
                    <MapPin size={20} />
                    São Lourenço do Turvo, Matão-São paulo
                  </p>
                </div>
              </li>

              <li className="py-4 pr-6 flex gap-8  items-center border border-slate-200 rounded-lg max-w-3xl">
                <div className="flex flex-col items-center px-7 relative after:absolute after:w-[1px] after:h-full after:bg-slate-200 after:right-0 after:top-1/2 after:-translate-y-1/2">
                  <span className="text-lg font-medium text-slate-900">
                    Qua
                  </span>
                  <h4 className="text-[2rem] font-bold text-slate-900">12</h4>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <p className="flex items-center text-slate-400 gap-2">
                      <Clock size={20} />
                      09:00-10:00
                    </p>

                    <Link
                      href="/house/:id"
                      className="flex items-center text-slate-400 gap-2"
                    >
                      <ExternalLink size={20} />
                      visualizar imovel
                    </Link>
                  </div>
                  <p className="flex items-center text-slate-400 gap-2">
                    <MapPin size={20} />
                    São Lourenço do Turvo, Matão-São paulo
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
