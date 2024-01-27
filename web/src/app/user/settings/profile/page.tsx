'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function UserDashboard() {
  return (
    <main>
      <header className="border-b border-slate-200">
        <div className="pl-10 py-8">
          <h2 className="font-medium text-2xl text-slate-900">
            Configurar perfil
          </h2>
        </div>
      </header>
      <section className="border-b border-slate-200">
        <div className="pl-10 py-8 flex gap-4 items-center">
          <Image
            width={80}
            height={80}
            className="rounded-full "
            src="/assets/imgs/profile.jpg"
            alt=""
          />

          <div>
            <h4 className="text-slate-600">Foto de perfil</h4>
            <p className="text-xs mt-1 text-slate-400">
              Suporte para PNGs, JPEGs e GIFS abaixo de 10mb
            </p>

            <div className="flex ">
              {/* <label htmlFor="avatar">
                enviar novo avatar
                <input type="file" name="" id="avatar" />
              </label>
              <button>deletar imagem</button> */}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="pl-10 py-8">
          <h4 className="text-slate-600">Altere seus dados</h4>
          <p className="text-sm text-slate-400 mt-1">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <form className="max-w-2xl flex flex-col gap-5 mt-8">
            <Input.Label
              className=" justify-between flex items-center"
              name="Nome"
              id="name"
              isError={false}
            >
              <Input.Field id="name" className="max-w-96" />
            </Input.Label>

            <Input.Label
              className=" justify-between  flex items-center"
              name="Email"
              id="email"
              isError={false}
            >
              <Input.Field className="max-w-96" id="email" />
            </Input.Label>
            <div className="flex justify-end gap-4 ">
              <Button className="max-w-36" variant="secondary">
                Cancelar
              </Button>
              <Button className="max-w-36">Alterar</Button>
            </div>
          </form>
        </div>
      </section>

      <section className="">
        <div className="pl-10 py-8">
          <h4 className="text-slate-600">Zona perigosa </h4>
          <p className="text-sm text-slate-400 max-w-lg mt-1">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
          <Button
            variant="ghost"
            className="text-rose-500 w-fit px-0 mt-5 font-semibold"
          >
            deletar conta
          </Button>
        </div>
      </section>
    </main>
  )
}
