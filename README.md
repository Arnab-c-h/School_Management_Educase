# School Management API

A small Express and MySQL API for the Educase school-management assignment.

The API can add schools and return all saved schools sorted by distance from a given latitude and longitude.

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

## Environment Variables

Railway MySQL provides these variables automatically:

```env
MYSQLHOST=
MYSQLPORT=3306
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
```

The app also supports these fallback names for local use:

```env
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_SSL=false
```

## Routes

### Health Check

```http
GET /
```

Response:

```text
API is running!
```

### Add School

```http
POST /addSchool
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
GET /listSchools?latitude=22.5726&longitude=88.3639
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

1. Create a Railway project.
2. Add a MySQL service.
3. Add this GitHub repository as the API service.
4. Set the start command to:

```text
npm start
```

5. In the API service variables, reference the MySQL service variables:

```env
MYSQLHOST=${{MySQL.MYSQLHOST}}
MYSQLPORT=${{MySQL.MYSQLPORT}}
MYSQLUSER=${{MySQL.MYSQLUSER}}
MYSQLPASSWORD=${{MySQL.MYSQLPASSWORD}}
MYSQLDATABASE=${{MySQL.MYSQLDATABASE}}
NODE_ENV=production
```

6. Run `database/schema.sql` against the Railway MySQL database.
7. Generate a public domain for the API service and test the routes.

## Postman

Import this collection:

```text
postman/School_Management_API.postman_collection.json
```

Set `baseUrl` to your local URL or Railway public URL.

## Checks

- `GET /` returns `API is running!`
- `POST /addSchool` with valid data returns `201`
- `POST /addSchool` with missing data returns `400`
- `GET /listSchools` returns schools sorted by `distanceKm`
- Unknown routes return `404`
