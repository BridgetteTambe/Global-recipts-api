# The Global Kitchen API

A RESTful API for managing a digital cookbook. Built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Configuration:** dotenv

## Project Structure

```
global-kitchen/
├── src/
│   ├── app.js                   # Entry point — starts the server
│   ├── config/
│   │   └── database.js          # Single DB connection module (DRY)
│   ├── models/
│   │   └── recipe.model.js      # Mongoose schema + validation
│   ├── routes/
│   │   └── recipe.routes.js     # API endpoint definitions
│   ├── controllers/
│   │   └── recipe.controller.js # Request/response handling
│   ├── services/
│   │   └── recipe.service.js    # Business logic
│   └── middleware/
│       └── errorHandler.js      # Global error handler
├── .env.example
├── .gitignore
└── package.json
```

## Features

- Full CRUD operations for recipes
- Filter recipes by category
- Schema-level validation (required fields, enums, min values)
- MongoDB indexes on `category` and `title` for fast lookups
- Global error handler — proper HTTP status codes for every error
- Async/await throughout — non-blocking I/O
- Environment-based configuration via `.env`

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [your-repo-url]
   cd global-kitchen
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:

   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/global-kitchen
   ```

4. **Start the server:**

   ```bash
   # Production
   npm start

   # Development (with auto-restart)
   npm run dev
   ```

The API will be running at `http://localhost:3000`.

---

## API Endpoints

### Get all recipes
```
GET /recipes
```
Optional filter by category:
```
GET /recipes?category=Dinner
```

### Get a single recipe
```
GET /recipes/:id
```

### Create a recipe
```
POST /recipes
Content-Type: application/json

{
  "title": "Jollof Rice",
  "ingredients": ["rice", "tomatoes", "onion", "pepper", "chicken stock"],
  "instructions": "Blend tomatoes and pepper. Fry onions, add blend, then add rice and stock. Cook on low heat.",
  "cookingTime": 45,
  "difficulty": "Medium",
  "category": "Dinner"
}
```

### Update a recipe (partial update)
```
PATCH /recipes/:id
Content-Type: application/json

{
  "cookingTime": 50
}
```

### Delete a recipe
```
DELETE /recipes/:id
```

---

## Valid Values

| Field        | Accepted Values                                             |
|--------------|-------------------------------------------------------------|
| `difficulty` | `Easy`, `Medium`, `Hard`                                    |
| `category`   | `Breakfast`, `Lunch`, `Dinner`, `Dessert`, `Snack`, `Appetizer`, `Drink` |
| `cookingTime`| Any positive number (in minutes)                           |
