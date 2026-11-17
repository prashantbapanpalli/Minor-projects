# Blog REST API (Node.js + Express)
Minor Project 06 - by B Prashant.

## Overview
A REST API to create, read, update and delete blog posts. Data is stored in `data/posts.json`.

## Endpoints
| Method | Route | Description | Success |
|---|---|---|---|
| POST | /posts | Create a post (title, content, author, category) | 201 |
| GET | /posts | List all posts | 200 |
| GET | /posts/:id | Get one post | 200 / 404 |
| PUT | /posts/:id | Update title, content, author or category | 200 / 404 / 400 |
| DELETE | /posts/:id | Delete a post | 200 / 404 |

Errors: 400 (validation / bad JSON), 404 (not found), 500 (server error), always as JSON `{ "error": "..." }`.

## Technologies
Node.js, Express.js, JSON file storage.

## Install and run
```
npm install
npm start        # http://localhost:3000
```

## Testing (Postman / Thunder Client)
1. POST http://localhost:3000/posts with JSON body
   `{ "title": "Hello", "content": "My first post", "author": "Prashant", "category": "Tech" }`
2. GET /posts, GET /posts/1
3. PUT /posts/1 with `{ "title": "Updated title" }`
4. DELETE /posts/1
5. Try a missing id or empty body to see the error responses.
