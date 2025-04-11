# Resume-Generator API

This API allows users to generate tailored resumes/CVs based on their profiles and specific job listings. It includes user authentication for managing accounts and utilizes various technologies to ensure performance and security.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication (sign up, sign in, sign out)
- Generate tailored resumes/CVs based on user profiles and job listings
- Caching for improved performance using Redis
- Secure authentication with JWT
- Database management with PostgreSQL via Drizzle ORM

## Technologies Used

- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Web framework for building RESTful APIs
- **Drizzle ORM**: Database connection and management
- **PostgreSQL**: Relational database for storing user profiles and job listings
- **JWT**: Library for secure user authentication
- **Redis**: In-memory data store for caching

## Installation

1. Clone the repository:

   git clone https://github.com/sophrone/resume-cv-generator.git
   cd resume-cv-generator

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory and add your environment variables:

   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_postgresql_connection_string
   REDIS_URL=your_redis_url

4. Start the server:

   npm run dev

## Usage

- **Sign Up**: Send a POST request to `/signup` with user profile information.
- **Sign In**: Send a POST request to `/signin` with credentials to obtain a JWT token.
- **Generate CV**: Send a POST request to `/generate-cv` with user profile and job listing details to get a tailored CV.

## API Endpoints

### Sign Up

- **Endpoint**: `/signup`
- **Method**: `POST`
- **Request Body**:
  json
  {
  "username": "string",
  "password": "string",
  "email": "string",
  "profile": {
  "name": "string",
  "experience": "array",
  "education": "array",
  "skills": "array"
  }
  }
- **Responses**:
  - `201 Created`: User account created successfully.
  - `400 Bad Request`: Validation errors or user already exists.
  - `500 Internal Server Error`: Failed to create user.

### Sign In

- **Endpoint**: `/signin`
- **Method**: `POST`
- **Request Body**:
  json
  {
  "username": "string",
  "password": "string"
  }
- **Responses**:
  - `200 OK`: Returns JWT token.
  - `401 Unauthorized`: Invalid credentials.
  - `500 Internal Server Error`: Error during sign-in.

### Generate CV

- **Endpoint**: `/generate-cv`
- **Method**: `POST`
- **Request Body**:
  json
  {
  "userId": "number",
  "jobListing": {
  "title": "string",
  "requirements": "array",
  "description": "string"
  }
  }
- **Responses**:
  - `200 OK`: Returns the generated CV.
  - `401 Unauthorized`: User not authenticated.
  - `400 Bad Request`: Validation errors.
  - `500 Internal Server Error`: Error during CV generation.

## Authentication

The API uses JWT for authentication. After signing in, the user receives a token that must be included in the `Authorization` header for subsequent requests to protected routes.

Example header:

Authorization: Bearer your_token_here

## Error Handling

All API responses include appropriate status codes and messages for different scenarios. A centralized error handling middleware is recommended for better maintainability.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for discussions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
