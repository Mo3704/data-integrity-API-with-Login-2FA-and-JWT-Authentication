# Secure Node.js API with 2FA Authentication

A secure REST API built with Node.js, Express, and MySQL that implements Two-Factor Authentication (2FA) using Time-based One-Time Passwords (TOTP).

## Features

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

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

4. Create the required database tables:
```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    two_factor_secret VARCHAR(255)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL
);
```

5. Start the server:
```bash
npm start
```

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

The API returns appropriate HTTP status codes:
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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 