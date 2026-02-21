📦 BLK Hacking IND – Shashank Pradhan
🚀 Overview

This project is a containerized Node.js + TypeScript backend that implements:

Transaction parsing

Transaction validation

Temporal filtering (Q, P, K rules)

Returns calculation (NPS & Index)

Performance metrics endpoint

Unit & Integration testing

Production-ready Docker setup

The application runs on port 5477 inside the container.

🏗 Tech Stack

Node.js (LTS)

TypeScript

Express

Jest (Testing)

Supertest (API testing)

Docker (Production containerization)

📂 Project Structure
src/
  controllers/
  services/
  models/
  utils/
  routes/
  app.ts
  server.ts

test/
  health.test.ts
  transactions.test.ts
  validator.test.ts
  filter.test.ts
  returns.test.ts
  performance.test.ts

Dockerfile
compose.yaml
jest.config.ts
⚙️ Installation
1️⃣ Install dependencies
npm install
2️⃣ Run locally (development)
npm run dev

Server runs on:

http://localhost:5477
🐳 Docker Setup (MANDATORY REQUIREMENT)
✅ Image Naming Convention
blk-hacking-ind-pradhan-shashank
🏗 Build Image
docker build -t blk-hacking-ind-pradhan-shashank .
▶ Run Container
docker run -d -p 5477:5477 blk-hacking-ind-pradhan-shashank
Port Mapping
Host: 5477
Container: 5477

The application exposes:

EXPOSE 5477
🐧 Operating System

The Docker image is based on:

node:20-alpine
Selection Criteria

Lightweight Linux distribution

Small image size

Faster container startup

Production optimized

Reduced attack surface

🧪 Testing (Bonus Feature)

All tests are located inside:

/test

Each test file includes:

Test type

Validation description

Command for execution

Run Tests
npm test
Run Coverage
npm run test:coverage

Coverage threshold:

Branches: 80%

Functions: 80%

Lines: 80%

Statements: 80%

📡 API Endpoints
1️⃣ Health Check
GET /health

Response:

{
  "status": "OK"
}
2️⃣ Parse Transactions
POST /transactions/parse

Input:

{
  "wage": 1000,
  "expenses": [
    {
      "date": "2024-01-01",
      "amount": 200
    }
  ]
}
3️⃣ Validate Transactions
POST /transactions/validate

Validates:

Duplicate timestamps

Invalid timestamp format

Invalid numeric fields

Remanent rules

Business constraints

4️⃣ Apply Temporal Rules
POST /transactions/filter

Applies:

Q override

P addition

K aggregation

Optimized for large scale (10⁶ transactions).

5️⃣ Returns Calculation
POST /returns/nps
POST /returns/index

Calculates:

Total amount

Total ceiling

Savings by date ranges

Final return metrics

6️⃣ Performance Endpoint
GET /performance

Returns:

{
  "time": "0.123 ms",
  "memory": "15.22 MB",
  "threads": 8
}
⚡ Performance Optimization

Pre-converted timestamps to numeric values

Avoided nested heavy operations

Reduced object allocations

Single-pass aggregations

Memory-efficient grouping logic

Optimized for 1M+ transactions

🏭 Production Readiness

Multi-stage Docker build

Compiled TypeScript

Strict typing

Error handling

Structured folder architecture

Scalable service-based architecture

▶ Docker Compose (If Required)

If additional services are added, use:

docker compose up --build

File name:

compose.yaml
📊 Evaluation Highlights

✔ Dockerized
✔ Linux-based container
✔ Port 5477 exposed
✔ Production build
✔ Test coverage included
✔ Optimized for large datasets
✔ Clean architecture
✔ Business rule validation

👤 Author

Shashank Pradhan

Hackathon Submission
BLK Hacking IND
