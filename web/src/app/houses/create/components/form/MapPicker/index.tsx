'use client'
import { Skeleton } from '@/components/skeleton'
import dynamic from 'next/dynamic'
import { MapEvent } from '@/components/map/Event'
import { useMapPicker } from './useMapPicker'

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => <Skeleton />,
})

export function MapPicker() {
  const { handleSubmit, position, handleClickPosition } = useMapPicker()

  return (
    <>
      <div className="absolute z-50 top-16 left-1/2 rounded-lg -translate-x-1/2 bg-slate-50 p-8 shadow-lg shadow-slate-200">
        <h2 className="text-slate-900 text-2xl font-semibold ">
          Agora selecione no mapa a localização do imóvel{' '}
        </h2>
        <p className="text-slate-400 mt-2  max-w-lg">
          Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.{' '}
        </p>
      </div>

      <form
        id="house"
        onSubmit={handleSubmit}
        className="absolute top-0 left-0 w-full h-[calc(100vh_-_90px)] z-10 "
      >
        <Map markers={position}>
          <MapEvent
            click={({ latlng: { lat, lng } }) => {
              handleClickPosition(lat, lng)
            }}
          />
        </Map>
      </form>
    </>
  )
}
