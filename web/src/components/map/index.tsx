import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { ReactNode } from 'react'
import { MarkerPoint } from '../map/Marker'

export interface Location {
  lat: number
  lng: number
}

interface MapProps {
  children?: ReactNode
  markers?: Location[]
}

const Map = ({ children, markers }: MapProps) => {
  const username = 'aldovani'
  const styleId = 'clkq989af00j401qlh51s0d4w'
  const accessToken =
    'pk.eyJ1IjoiYWxkb3ZhbmkiLCJhIjoiY2xrdzNhdWxyMGswYjNxbzJsMmxjOTJyeiJ9.e3vXA50E2W3Xbv-yqZKpNw'

  return (
    <MapContainer
      center={[-21.520844, -48.392082]}
      zoom={15}
      zoomControl={false}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <ZoomControl position="bottomright" />
      {children}

      {markers?.map((marker, idx) => (
        <MarkerPoint key={idx} lat={marker.lat} lng={marker.lng} />
      ))}

      <TileLayer
        // attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        // url={`https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}

        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
