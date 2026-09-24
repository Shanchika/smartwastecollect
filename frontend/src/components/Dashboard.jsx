
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Dashboard() {
  const [bins, setBins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await api.getBinStatus()
        setBins(data)
      } catch (e) {
        setError('Failed to load bins')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div>
      <h2>Alerts & Status</h2>
      <table className="tbl">
        <thead>
          <tr>
            <th>Code</th><th>Location</th><th>Type</th><th>Fill</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bins.map(b => (
            <tr key={b.id} className={b.status === 'Full' ? 'warn' : ''}>
              <td>{b.code}</td>
              <td>{b.location}</td>
              <td>{b.type}</td>
              <td>{b.fillLevel}%</td>
              <td>{b.status}</td>
              <td>
                <button disabled={b.fillLevel === 0} onClick={async () => {
                  await api.emptyBin(b.id)
                  const refreshed = await api.getBinStatus()
                  setBins(refreshed)
                }}>Mark Emptied</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
