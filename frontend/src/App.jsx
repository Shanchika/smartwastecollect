
import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import MapView from './components/MapView'
import RecordCollection from './components/RecordCollection'

export default function App() {
  return (
    <div className="container">
      <header className="topbar">
        <h1>SmartWaste — Collector</h1>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/record">Record Collection</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/record" element={<RecordCollection />} />
        </Routes>
      </main>
    </div>
  )
}
