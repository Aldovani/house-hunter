import { Armchair, Bath, Dog, Flame, Wifi, Wind } from 'lucide-react'
import { Select } from '../../Select'
import { SelectItem } from '../../Select/item'
import { useBenefits } from './useBenefits'

export function Benefits() {
  const { benefits, handleChange, handleSubmit } = useBenefits()
  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-sm">
        Informe o que sua residência tem para oferecer?
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-xl">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.{' '}
      </p>
      <form id="house" onSubmit={handleSubmit}></form>
      <Select value={benefits} onChange={handleChange} multiple>
        <SelectItem id="WiFi">
          <Wifi size={32} />
          <span className="mt-2 font-medium block">WiFi</span>
        </SelectItem>
        <SelectItem id="dog">
          <Dog size={32} />
          <span className="mt-2 font-medium block">Permitido animais</span>
        </SelectItem>
        <SelectItem id="flame">
          <Flame size={32} />
          <span className="mt-2 font-medium block">Churrasqueira</span>
        </SelectItem>
        <SelectItem id="bath">
          <Bath size={32} />
          <span className="mt-2 font-medium block">Banheira</span>
        </SelectItem>
        <SelectItem id="armchair">
          <Armchair size={32} />
          <span className="mt-2 font-medium block">Casa mobiliada</span>
        </SelectItem>
        <SelectItem id="wind">
          <Wind size={32} />
          <span className="mt-2 font-medium block">Ar condicionado</span>
        </SelectItem>
      </Select>
    </>
  )
}
