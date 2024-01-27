import { Input } from '@/components/ui/input'

export function About() {
  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-sm">
        De um bom titulo para o e imóvel e o descreva
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-xl">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.{' '}
      </p>

      <Input.Label name="Titulo">
        <Input.Field />
      </Input.Label>
      <Input.Label className="mt-4" name="Descrição">
        <Input.TextArea />
      </Input.Label>
    </>
  )
}
