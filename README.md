# School Management API

A small Express and MySQL API for the Educase school-management assignment.

The API can add schools and return all saved schools sorted by distance from a given latitude and longitude.

Live API:

```text
https://schoolmanagementeducase-production.up.railway.app
```

## Stack

- Node.js
- Express
- MySQL
- mysql2
- Joi

## Structure

```text
.
|-- database/
|   `-- schema.sql
|-- postman/
|   `-- School_Management_API.postman_collection.json
|-- src/
|   |-- app.js
|   |-- server.js
|   |-- config/
|   |-- controllers/
|   |-- db/
|   |-- routes/
|   |-- utils/
|   `-- validators/
|-- .env.example
|-- package.json
`-- README.md
```

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` and add your MySQL values.

Local port:

```env
PORT=6999
```

Run the database schema:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

Start the server:

```bash
npm run dev
```

Default URL:

```text
http://localhost:6999
```

Railway injects its own `PORT` value at runtime. The current Railway deployment runs on port `8080` internally and is exposed through the public URL above. Do not hardcode `8080` in local `.env`.

## Environment Variables

The app reads Railway MySQL variables first:

```env
MYSQLHOST=
MYSQLPORT=3306
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
```

It also supports these fallback names for local MySQL setups:

```env
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_SSL=false
```

On Railway, the API service uses variable references from the `MySQL` service. Secrets are managed by Railway and should not be committed.

## Routes

Use `{baseUrl}` as either the local URL or the Railway URL.

### Health Check

```http
GET {baseUrl}/
```

Response:

```text
API is running!
```

### Add School

```http
POST {baseUrl}/addSchool
```

Body:

```json
{
  "name": "Delhi Public School",
  "address": "Kolkata, West Bengal",
  "latitude": 22.5726,
  "longitude": 88.3639
}
```

Success:

```json
{
  "status": "success",
  "data": {
    "school": {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Kolkata, West Bengal",
      "latitude": 22.5726,
      "longitude": 88.3639
    }
  }
}
```

### List Schools

```http
GET {baseUrl}/listSchools?latitude={latitude}&longitude={longitude}
```

Success:

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "schools": [
      {
        "id": 1,
        "name": "Delhi Public School",
        "address": "Kolkata, West Bengal",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "distanceKm": 0
      }
    ]
  }
}
```

Validation errors return:

```json
{
  "status": "fail",
  "message": "Latitude is required"
}
```

## Railway Deployment

Current Railway setup:

```text
Project: zestful-expression
API service: School_Management_Educase
Database service: MySQL
Environment: production
Public URL: https://schoolmanagementeducase-production.up.railway.app
Internal runtime port: 8080
Deployment status: SUCCESS
```

Railway build and start:

```text
npm install
npm start
```

API service variables:

```env
NODE_ENV=production
MYSQLHOST=${{MySQL.MYSQLHOST}}
MYSQLPORT=${{MySQL.MYSQLPORT}}
MYSQLUSER=${{MySQL.MYSQLUSER}}
MYSQLPASSWORD=${{MySQL.MYSQLPASSWORD}}
MYSQLDATABASE=${{MySQL.MYSQLDATABASE}}
```

Database setup:

```text
Run database/schema.sql against the Railway MySQL service.
```

Do not set `PORT` manually on Railway unless needed. Railway provides it automatically.

## Postman

Import this collection:

```text
postman/School_Management_API.postman_collection.json
```

Raw collection URL:

```text
https://raw.githubusercontent.com/Arnab-c-h/School_Management_Educase/main/postman/School_Management_API.postman_collection.json
```

The collection uses variables for `baseUrl`, coordinates, and school data. Set `baseUrl` to:

```text
https://schoolmanagementeducase-production.up.railway.app
```

## Checks

- `GET /` returns `API is running!`
- `POST /addSchool` with valid data returns `201`
- `POST /addSchool` with missing data returns `400`
- `GET /listSchools` returns schools sorted by `distanceKm`
- Unknown routes return `404`
