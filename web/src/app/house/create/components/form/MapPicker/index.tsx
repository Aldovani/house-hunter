'use client'
import { Skeleton } from '@/components/Skeleton'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import { MapEvent } from '@/components/Map/Event'
import { useMapPicker } from './useMapPicker'

const Map = dynamic(() => import('@/components/Map'), {
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
