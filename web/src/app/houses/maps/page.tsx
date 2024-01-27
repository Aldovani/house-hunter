/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/header'
import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/skeleton'

const Map = dynamic(() => import('../../../components/map'), {
  ssr: false,
  loading: () => <Skeleton />,
})

export default function Maps() {
  return (
    <>
      <Header />

      <div className="w-full h-full z-10 absolute top-[70px] max-h-[calc(100vh_-_70px)]">
        <Map markers={[{ lat: -21.520844, lng: -48.392082 }]} />
      </div>
    </>
  )
}
