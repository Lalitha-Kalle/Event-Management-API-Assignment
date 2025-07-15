
# Event Management API 

This is a backend project I developed using **Node.js**, **Express**, and **Sequelize (PostgreSQL)**. It handles user registrations for events, event creation, and various conditions like event capacity, duplicate registrations, past events, and more.

I built this as part of my learning/internship assignment to improve my skills in building REST APIs with proper validation, relationships, and clean code structure.



##  Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- bcrypt (for password hashing)
- http-status-codes (for clean status handling)
- Thunder Client (for API testing)

---

##  Project Structure

```
src/
  - controllers/         // Business logic for each route
  - models/              // Sequelize models
  - migrations/          // DB structure definitions
  - routes/
    - v1/              // Versioned routing
  - config/              // DB config
index.js                 // Server entry point
```

---

## Features Implemented

- User registration (with hashed passwords)
- Create events (capacity limited to 1000)
- Register a user for an event
- Cancel registration
- Prevent:
  - Duplicate registrations
  - Registration to past events
  - Overbooking (capacity limit)
- View event details including registered users
- Get stats: total, remaining, and percentage full
- List upcoming events sorted by date and location

---

##  How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Lalitha-Kalle/Event-Management-API-Assignment.git
   cd Event-Management-API-Assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database, then configure `config/config.json`.

```
  {
  "development": {
    "username": <user-name>,
    "password": <password>,
    "database": <development-db>,
    "host": "127.0.0.1",
    "port": <port>,
    "dialect": "postgres"
    },
  }
```

4. Run migrations:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

6. Test the APIs using Thunder Client or Postman.

---

##  Sample API Test Cases

###  Create User
```http
POST /api/v1/users
```
```json
{
  "name": "Lalitha",
  "email": "lalitha@example.com",
  "password": "123456"
}
```

###  Create Event
```http
POST /api/v1/events
```
```json
{
  "title": "Node Bootcamp",
  "datetime": "2025-12-10T10:00:00Z",
  "location": "Hyderabad",
  "capacity": 2
}
```

###  Register User
```http
POST /api/v1/events/1/register
```
```json
{
  "userId": 1
}
```

### Register to Past Event
```http
POST /api/v1/events/2/register
```
```json
{
  "userId": 1
}
```
> Response: `400 Bad Request` – "Cannot register for past events"



##  Notes

- Passwords are hashed using `bcrypt` before storing.
- All routes return consistent response objects: `{ success, message, data, error }`


## Author

**Lalitha Kalle**  
GitHub: [https://github.com/Lalitha-Kalle](https://github.com/Lalitha-Kalle)
