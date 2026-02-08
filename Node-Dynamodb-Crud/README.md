# Node.js DynamoDB CRUD Application

A complete CRUD (Create, Read, Update, Delete) REST API for managing Products using Node.js, Express, and AWS DynamoDB Local with Docker.

## Project Structure

```
Node-Dynamodb-Crud/
├── src/
│   ├── app.js                 # Express server entry point
│   ├── createTable.js         # Script to create DynamoDB Products table
│   ├── seed.js                # Script to seed sample products
│   ├── config/
│   │   └── dynamodb.js        # DynamoDB client configuration
│   ├── controllers/
│   │   └── productController.js   # Product business logic
│   ├── models/
│   │   └── productModel.js    # DynamoDB data operations
│   └── routes/
│       └── productRoutes.js   # API route definitions
├── docker-compose.yml         # Docker Compose services config
├── Dockerfile                 # Docker image build config
├── .env                       # Environment variables
├── package.json               # Node.js dependencies
└── README.md                  # This file
```

## Database Schema

**Table Name:** `Products`

| Column | Type | Description |
|--------|------|-------------|
| `id` | String (Primary Key) | Unique product identifier |
| `name` | String | Product name |
| `price` | Number | Product price (in USD) |
| `url_image` | String | Product image URL |

## Prerequisites

- Docker & Docker Compose (for containerized setup)
- Node.js 18+ (for local development)
- npm (Node Package Manager)

## Installation & Setup

### Option 1: Using Docker Compose (Recommended)

1. **Start the services:**
   ```bash
   cd Node-Dynamodb-Crud
   docker-compose up --build -d
   ```

2. **Create the DynamoDB table:**
   ```bash
   docker exec -it node-dynamodb-app npm run create-table
   ```

3. **Seed sample products:**
   ```bash
   docker exec -it node-dynamodb-app npm run seed
   ```

4. **Access the application:**
   - API: http://localhost:3000
   - DynamoDB Admin UI: http://localhost:8001

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   cd Node-Dynamodb-Crud
   npm install
   ```

2. **Start DynamoDB Local (in Docker):**
   ```bash
   docker-compose up -d dynamodb-local dynamodb-admin
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   Server runs on http://localhost:3000

4. **Create table and seed data:**
   ```bash
   npm run create-table
   npm run seed
   ```

## Available Scripts

```bash
npm start              # Start the Express server
npm run create-table   # Create the Products table in DynamoDB
npm run seed          # Seed 5 sample products
npm run setup         # Create table and seed in one command
```

## API Endpoints

### 1. Create Product
```http
POST /api/products
Content-Type: application/json

{
  "id": "PROD001",
  "name": "Product Name",
  "price": 99.99,
  "url_image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "message": "Product created successfully"
}
```

### 2. Get All Products
```http
GET /api/products
```

**Response:**
```json
[
  {
    "id": "PROD001",
    "name": "Laptop",
    "price": 1299,
    "url_image": "https://example.com/laptop.jpg"
  },
  ...
]
```

### 3. Get Product by ID
```http
GET /api/products/:id
```

**Response:**
```json
{
  "id": "PROD001",
  "name": "Laptop",
  "price": 1299,
  "url_image": "https://example.com/laptop.jpg"
}
```

### 4. Update Product
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 1399,
  "url_image": "https://example.com/new-image.jpg"
}
```

**Response:**
```json
{
  "message": "Product updated successfully"
}
```

### 5. Delete Product
```http
DELETE /api/products/:id
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

## Testing Endpoints

Using curl:
```bash
# Create
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"id":"p1","name":"Test","price":100,"url_image":"/img.jpg"}'

# Get all
curl http://localhost:3000/api/products

# Get one
curl http://localhost:3000/api/products/p1

# Update
curl -X PUT http://localhost:3000/api/products/p1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","price":150,"url_image":"/new.jpg"}'

# Delete
curl -X DELETE http://localhost:3000/api/products/p1
```

## Environment Variables (.env)

```env
PORT=3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=fakeMyKeyId
AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey
DYNAMODB_ENDPOINT=http://dynamodb-local:8000
TABLE_NAME=Products
```

## Docker Services

### dynamodb-local
- **Image:** amazon/dynamodb-local:latest
- **Port:** 8000
- **Purpose:** Local DynamoDB instance for development

### dynamodb-admin
- **Image:** aaronshaf/dynamodb-admin
- **Port:** 8001
- **Purpose:** Web UI to browse and manage DynamoDB tables

### node-dynamodb-app
- **Image:** node:18
- **Port:** 3000
- **Purpose:** Express.js REST API server

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f app
```

## Troubleshooting

### Port already in use
- Port 3000, 8000, or 8001 is occupied
- Solution: Change ports in `.env` and `docker-compose.yml`, or stop conflicting services

### DynamoDB connection refused
- Ensure `dynamodb-local` container is running
- Check DYNAMODB_ENDPOINT in `.env`
- Solution: `docker-compose up -d dynamodb-local`

### Exec format error in Docker
- Image architecture mismatch (typically ARM/x86 issue on M1/M2 Mac)
- Solution: Add `platform: linux/amd64` in docker-compose.yml

## Architecture

```
Client (curl/Postman)
    ↓
Express API (Port 3000)
    ├── productRoutes
    │   └── productController
    │       └── productModel
    │           └── DynamoDB Local
    │
    └── Environment (.env)
        └── Configuration (Port, AWS Keys, etc.)
```

## Author
**Le Phan Quoc Dai** - Student ID: 22003015

## Technology Stack
- **Runtime:** Node.js 18
- **Framework:** Express.js 5.2
- **Database:** AWS DynamoDB Local
- **Containerization:** Docker & Docker Compose
- **Configuration:** dotenv

## License
ISC
