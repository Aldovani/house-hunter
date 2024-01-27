import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'

export default function Password() {
  return (
    <main>
      <main>
        <header className="border-b border-slate-200">
          <div className="pl-10 py-8">
            <h2 className="font-medium text-2xl text-slate-900">
              Configurar senha
            </h2>
          </div>
        </header>

        <section className="border-b border-slate-200">
          <div className="pl-10 py-8">
            <h4 className="text-slate-600">Altere senha</h4>
            <p className="text-sm text-slate-400 mt-1">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <form className="max-w-2xl flex flex-col gap-5 mt-8">
              <Input.Label
                className=" justify-between flex items-center"
                name="Senha atual"
                id="password"
                isError={false}
              >
                <Input.Field
                  id="password"
                  type="password"
                  placeholder="•••••••••••••"
                  className="max-w-96"
                />
              </Input.Label>

              <Input.Label
                className=" justify-between  flex items-center"
                name="Nova senha"
                id="newPassword"
                isError={false}
              >
                <Input.Field
                  placeholder="•••••••••••••"
                  type="password"
                  className="max-w-96"
                  id="newPassword"
                />
              </Input.Label>
              <Input.Label
                className=" justify-between  flex items-center"
                name="Confirmar senha"
                id="confirmNewPassword"
                isError={false}
              >
                <Input.Field
                  placeholder="•••••••••••••"
                  type="password"
                  className="max-w-96"
                  id="confirmNewPassword"
                />
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
      </main>
    </main>
  )
}
