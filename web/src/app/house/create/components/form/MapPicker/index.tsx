'use client'
import { Skeleton } from '@/components/skeleton'
import styles from './styles.module.scss'
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
      <h2>Agora selecione no mapa a localização da residência</h2>
      <form
        id="house-1"
        onSubmit={handleSubmit}
        className={styles.containerMap}
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
