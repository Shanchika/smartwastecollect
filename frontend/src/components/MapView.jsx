
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { api } from '../api'

const icon = (color) => new L.DivIcon({
  className: 'bin-icon',
  html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2px solid #111"></div>`
})

export default function MapView() {
  const [bins, setBins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await api.getBinStatus()
      setBins(data)
      setLoading(false)
    })()
  }, [])

  if (loading) return <p>Loading map...</p>

  const center = bins.length ? [bins[0].lat || 6.9271, bins[0].lng || 79.8612] : [6.9271, 79.8612]

  return (
    <div>
      <h2>Map View</h2>
      <MapContainer center={center} zoom={11} style={{ height: '70vh', borderRadius: 8 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {bins.map(b => {
          const color = b.fillLevel >= 80 ? '#e11d48' : (b.fillLevel >= 50 ? '#f59e0b' : '#22c55e')
          return (
            <Marker position={[b.lat || 0, b.lng || 0]} key={b.id} icon={icon(color)}>
              <Popup>
                <b>{b.code}</b><br/>
                {b.location}<br/>
                Type: {b.type}<br/>
                Fill: {b.fillLevel}% ({b.status})<br/><br/>
                <button onClick={async () => {
                  await api.emptyBin(b.id)
                  const refreshed = await api.getBinStatus()
                  setBins(refreshed)
                }}>Mark Emptied</button>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
