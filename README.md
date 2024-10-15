# E-commerce API

## Overview

This project is an e-commerce API built with Express.js and MongoDB. It provides functionalities for user registration, product management, and order processing. The API is containerized using Docker for easy deployment and management.

## Features

- User registration and authentication
- Product management (CRUD operations)
- Order processing
- JWT-based authentication
- Password hashing with bcrypt


## Technology Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## API Endpoints

### Users

- **POST** `/users`: Register a new user (username, password, email).
- **GET** `/users/{id}`: Get user details.
- **PUT** `/users/{id}`: Update user details.
- **DELETE** `/users/{id}`: Delete a user.

### Products

- **POST** `/products`: Create a new product (name, description, price, stock).
- **GET** `/products/{id}`: Get product details.
- **PUT** `/products/{id}`: Update product details.
- **DELETE** `/products/{id}`: Delete a product.

### Orders

- **POST** `/orders`: Create a new order (user ID, product IDs, quantities).
- **GET** `/orders/{id}`: Get order details.
- **GET** `/users/{id}/orders`: List all orders for a user.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- Basic knowledge of Node.js and Express.js.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Balaravi9688/E-commerce_backend.git
   cd E-commerce_backend

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the project root:

    ```bash
    touch .env
    ```

    Add the following content to the `.env` file:

    ```
    JWT_SECRET=your_jwt_secret
    ```

4. Start the MongoDB server:

    ```bash
    sudo systemctl start mongod
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. The API will be running at `http://localhost:8000`.
