import { Button } from '@/components/ui/Button'

type BasicInformationItemProps = {
  name: string
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export function BasicInformationItem({
  name,
  onDecrement,
  onIncrement,
  value,
}: BasicInformationItemProps) {
  return (
    <li className="flex items-center justify-between pb-4 border-b  border-slate-200">
      <span className="text-xl text-slate-600">{name}</span>
      <div className="flex gap-6 items-center">
        <Button
          type="button"
          className="w-fit text-2xl py-2 px-4"
          onClick={onDecrement}
          variant="outline"
        >
          -
        </Button>
        <span className="text-2xl text-slate-600">{value}</span>
        <Button
          className="w-fit text-2xl py-2 px-4"
          onClick={onIncrement}
          variant="outline"
          type="button"
        >
          +
        </Button>
      </div>
    </li>
  )
}
