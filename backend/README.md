
# SmartWasteCollect — Backend

## Run (local MongoDB)
```bash
mvn spring-boot:run
```

## Build + Run jar
```bash
mvn clean package -DskipTests
java -jar target/collect-1.0.0.jar
```

## Endpoints
- `GET /api/bins`
- `GET /api/bins/status`
- `POST /api/collect/record` — `{ binId, weightKg, note? }`
- `PUT /api/collect/empty/{binId}`
- `GET /api/collect/my?collectorId=collector-demo`
