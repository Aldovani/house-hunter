import { LeafletEventHandlerFnMap } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

export function MapEvent(handlers: LeafletEventHandlerFnMap) {
  useMapEvents({ ...handlers })
  return null
}
