
# SmartWasteCollect — Frontend (React + Vite)

## Run
```bash
npm install
npm run dev
```
The app expects the backend at `http://localhost:8080`. You can override via `.env`:

```
VITE_API_BASE=http://localhost:8080/api
```

## Pages
- Dashboard — list of bins with quick "Mark Emptied"
- Map — Leaflet map, colored markers (green/yellow/red), action in popup
- Record Collection — save weight + note and see your records
