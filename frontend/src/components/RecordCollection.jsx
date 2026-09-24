
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function RecordCollection() {
  const [bins, setBins] = useState([])
  const [form, setForm] = useState({ binId: '', weightKg: '', note: '' })
  const [message, setMessage] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      const [b, c] = await Promise.all([api.getBins(), api.myCollections()])
      setBins(b)
      setList(c)
    })()
  }, [])

  return (
    <div>
      <h2>Record Collection</h2>
      <form className="card" onSubmit={async (e) => {
        e.preventDefault()
        setMessage('')
        if (!form.binId || !form.weightKg) {
          setMessage('Pick a bin and enter weight')
          return
        }
        await api.recordCollection({ binId: form.binId, weightKg: Number(form.weightKg), note: form.note })
        setForm({ binId: '', weightKg: '', note: '' })
        const c = await api.myCollections()
        setList(c)
      }}>
        <label>Bin</label>
        <select value={form.binId} onChange={e=>setForm(f=>({ ...f, binId: e.target.value}))}>
          <option value="">-- select --</option>
          {bins.map(b => <option key={b.id} value={b.id}>{b.code} — {b.location}</option>)}
        </select>

        <label>Weight (kg)</label>
        <input type="number" step="0.1" value={form.weightKg} onChange={e=>setForm(f=>({...f, weightKg: e.target.value}))}/>

        <label>Note (optional)</label>
        <input value={form.note} onChange={e=>setForm(f=>({...f, note: e.target.value}))}/>

        <button type="submit">Save</button>
        {message && <p className="error" style={{marginTop:8}}>{message}</p>}
      </form>

      <h3 style={{marginTop:24}}>My Collections</h3>
      <table className="tbl">
        <thead><tr><th>When</th><th>Bin</th><th>Weight</th><th>Note</th></tr></thead>
        <tbody>
          {list.map(r => (
            <tr key={r.id}>
              <td>{new Date(r.collectedAt).toLocaleString()}</td>
              <td>{r.binId}</td>
              <td>{r.weightKg} kg</td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
