import {
  Building2,
  Castle,
  Home,
  Sailboat,
  School2,
  Tractor,
} from 'lucide-react'
import { Select } from '../../Select'
import { SelectItem } from '../../Select/item'
import { usePropertyType } from './usePropertyType'

export function PropertyType() {
  const { handleChangeProperty, handleSubmit, propertyType } = usePropertyType()
  return (
    <form id="house" onSubmit={handleSubmit}>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-md">
        Qual das seguintes opções descreve melhor seu espaço?
      </h2>
      <p className="text-slate-400 mt-2 mb-8">
        Porem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <Select
        value={propertyType || ''}
        onChange={handleChangeProperty}
        name="propertiesTypes"
      >
        <SelectItem id="house">
          <Home size={32} />
          <span className="mt-2 font-medium block">Casa</span>
        </SelectItem>
        <SelectItem id="apartment">
          <Building2 size={32} />
          <span className="mt-2 font-medium block">Apartamento</span>
        </SelectItem>
        <SelectItem id="condominium">
          <School2 size={32} />
          <span className="mt-2 font-medium block">Condomínio</span>
        </SelectItem>
        <SelectItem id="farm">
          <Tractor size={32} />
          <span className="mt-2 font-medium block">Fazenda</span>
        </SelectItem>
        <SelectItem id="beachHouse">
          <Sailboat size={32} />
          <span className="mt-2 font-medium block">Casa na praia</span>
        </SelectItem>
        <SelectItem id="castle">
          <Castle size={32} />
          <span className="mt-2 font-medium block">Castelo</span>
        </SelectItem>
      </Select>
    </form>
  )
}
