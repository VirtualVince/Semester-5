COMP3123 Assignment 1 - Employee Management API
Project Description
A RESTful API built with Node.js, Express, and MongoDB for managing users and employees. This project implements full CRUD operations with proper validation, error handling, and password hashing.
Technologies Used

Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - ODM for MongoDB
bcrypt - Password hashing
express-validator - Input validation
dotenv - Environment variables

Prerequisites

Node.js (v14 or higher)
MongoDB (local installation or MongoDB Atlas account)
npm or yarn package manager

Installation
1. Clone the repository
bashgit clone https://github.com/YourStudentNumber_COMP3123_Assignment1.git
cd YourStudentNumber_COMP3123_Assignment1
2. Install dependencies
bashnpm install
3. Set up environment variables
Create a .env file in the root directory:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/comp3123_assigment1
For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/comp3123_assigment1
4. Start MongoDB
If using local MongoDB:
bashmongod
5. Run the application
bashnpm start
For development with auto-reload:
bashnpm run dev
The server will start on http://localhost:3000
Project Structure
├── server.js                 # Main application file
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── models/
│   ├── User.js              # User schema
│   └── Employee.js          # Employee schema
├── controllers/
│   ├── userController.js    # User business logic
│   └── employeeController.js # Employee business logic
└── routes/
    ├── userRoutes.js        # User endpoints
    └── employeeRoutes.js    # Employee endpoints
API Endpoints
User Routes
1. Signup

POST /api/v1/user/signup
Status Code: 201
Request Body:

json{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}

Response:

json{
  "message": "User created successfully.",
  "user_id": "64c9e5a3d9f3c1a5c9b4e8a1"
}
2. Login

POST /api/v1/user/login
Status Code: 200
Request Body (with email):

json{
  "email": "johndoe@example.com",
  "password": "password123"
}
OR
json{
  "username": "johndoe",
  "password": "password123"
}

Response:

json{
  "message": "Login successful."
}
Employee Routes
3. Get All Employees

GET /api/v1/emp/employees
Status Code: 200
Response:

json[
  {
    "employee_id": "64c9e5a3d9f3c1a5c9b4e8a2",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "position": "Software Engineer",
    "salary": 90000,
    "date_of_joining": "2023-08-01T00:00:00.000Z",
    "department": "Engineering"
  }
]
4. Create Employee

POST /api/v1/emp/employees
Status Code: 201
Request Body:

json{
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}

Response:

json{
  "message": "Employee created successfully.",
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4"
}
5. Get Employee by ID

GET /api/v1/emp/employees/:eid
Status Code: 200
Example: /api/v1/emp/employees/64c9e5a3d9f3c1a5c9b4e8a4
Response:

json{
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4",
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
6. Update Employee

PUT /api/v1/emp/employees/:eid
Status Code: 200
Example: /api/v1/emp/employees/64c9e5a3d9f3c1a5c9b4e8a4
Request Body:

json{
  "position": "Senior Designer",
  "salary": 95000
}

Response:

json{
  "message": "Employee details updated successfully."
}
7. Delete Employee

DELETE /api/v1/emp/employees?eid=64c9e5a3d9f3c1a5c9b4e8a4
Status Code: 204
Response: No content

Testing with Postman

Import the included Postman collection
Set the base URL to http://localhost:3000
Test each endpoint in order:

Create a user (signup)
Login with the user credentials
Create employees
Get all employees
Get a specific employee
Update an employee
Delete an employee



Sample Test Credentials
For testing purposes, you can use:

Username: testuser
Email: test@example.com
Password: password123

Validation Rules
User

Username: required, minimum 3 characters
Email: required, valid email format
Password: required, minimum 6 characters

Employee

First name: required
Last name: required
Email: required, valid email format, unique
Position: required
Salary: required, must be a positive number
Date of joining: required, valid date format
Department: required

Error Handling
All endpoints return appropriate HTTP status codes and error messages:

200 - OK
201 - Created
204 - No Content
400 - Bad Request (validation errors)
404 - Not Found
500 - Internal Server Error

Example error response:
json{
  "status": false,
  "message": "Invalid Username and password"
}
Database Schema
Users Collection
javascript{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password": String (hashed),
  "created_at": Date,
  "updated_at": Date
}
Employees Collection
javascript{
  "_id": ObjectId,
  "first_name": String,
  "last_name": String,
  "email": String,
  "position": String,
  "salary": Number,
  "date_of_joining": Date,
  "department": String,
  "created_at": Date,
  "updated_at": Date
}
Security Features

Passwords are hashed using bcrypt before storage
Input validation on all endpoints
Mongoose schema validation
Proper error handling and status codes

Notes

Database name must be exactly: comp3123_assigment1 (as specified in assignment)
All dates should be in ISO 8601 format
All responses are in JSON format
Password hashing is implemented with bcrypt (salt rounds: 10)

Author
Vincente Sequeira
101484793
License
ISC