import L from 'leaflet'
import { Marker } from 'react-leaflet'

interface MarkerPointProps {
  lat: number
  lng: number
}

export function MarkerPoint({ lat, lng }: MarkerPointProps) {
  const iconPerson = new L.Icon({
    iconUrl: '/assets/imgs/iconMap.png',
    iconSize: new L.Point(36, 36),
    className: 'leaflet-div-icon',
  })
  return <Marker icon={iconPerson} alt="" position={{ lat, lng }} />
}
