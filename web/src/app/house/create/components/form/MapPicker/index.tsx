'use client'
import { Skeleton } from '@/components/skeleton'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import { MapEvent } from '@/components/map/Event'
import { useState } from 'react'
import { Location } from '@/components/map'

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => <Skeleton />,
})

export function MapPicker() {
  const [position, setPosition] = useState<Location[] | undefined>(undefined)

  return (
    <>
      <h2>Agora selecione no mapa a localização da residência</h2>
      <div className={styles.containerMap}>
        <Map markers={position}>
          <MapEvent
            click={(e) => {
              setPosition([
                {
                  lat: e.latlng.lat,
                  lnt: e.latlng.lng,
                },
              ])
            }}
          />
        </Map>
      </div>
    </>
  )
}
