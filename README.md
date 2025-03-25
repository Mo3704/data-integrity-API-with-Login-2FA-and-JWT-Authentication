# Secure Node.js API with 2FA Authentication

## Introduction

This project implements a secure REST API with Two-Factor Authentication (2FA) for enhanced security. It's designed to demonstrate best practices in API security, user authentication, and data protection. The API includes user management, product management, and secure authentication flows.

## Project Overview

This API serves as a secure backend for applications requiring:
- Secure user authentication
- Two-factor authentication for enhanced security
- Product management capabilities
- Protected API endpoints

The system uses industry-standard security practices including:
- JWT (JSON Web Tokens) for authentication
- TOTP (Time-based One-Time Passwords) for 2FA
- Password hashing with bcrypt
- Protected routes with middleware
- Secure database operations

## Key Features

- User Authentication with JWT
- Two-Factor Authentication (2FA) using TOTP
- Product Management API
- Secure Password Hashing
- MySQL Database Integration
- Express Middleware for Route Protection

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## API Endpoints

### Authentication

#### Sign Up
- **POST** `/auth/signup`
- **Body:**
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
    "username": "your_username",
    "password": "your_password"
}
```
- Returns a temporary token for 2FA setup

### Two-Factor Authentication

#### Setup 2FA
- **POST** `/2fa/setup`
- **Headers:**
  - `Authorization: Bearer <temp_token>`
- Returns QR code and secret for authenticator app

#### Verify 2FA
- **POST** `/2fa/verify`
- **Headers:**
  - `Authorization: Bearer <temp_token>`
- **Body:**
```json
{
    "token": "123456"  // 6-digit code from authenticator app
}
```

### Products

#### Create Product
- **POST** `/products`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Body:**
```json
{
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "quantity": 10
}
```

#### Get All Products
- **GET** `/products`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

#### Get Product by ID
- **GET** `/products/:id`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

#### Update Product
- **PUT** `/products/:id`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Body:**
```json
{
    "name": "Updated Name",
    "description": "Updated Description",
    "price": 149.99,
    "quantity": 15
}
```

#### Delete Product
- **DELETE** `/products/:id`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Two-Factor Authentication using TOTP
- Protected routes using middleware
- Secure password storage
- Input validation

## Error Handling

 HTTP status codes you might face:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing

To test the API endpoints, you can use Postman or any other API testing tool. Make sure to:
1. Sign up a new user
2. Login to get a temporary token
3. Set up 2FA using the temporary token
4. Verify 2FA to get a JWT token
5. Use the JWT token for protected routes

## Dependencies

- express
- mysql2
- jsonwebtoken
- bcryptjs
- speakeasy
- qrcode
- dotenv

