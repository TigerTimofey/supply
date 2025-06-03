[![Demo Video](https://img.shields.io/badge/Live%20Demo-Available-blue)](https://youtu.be/ktBYXccr_w0)

# Supply Platform

A full-stack web application for suppliers to manage their product catalogues, customers, and orders. The platform includes a React frontend and a Node.js/Express backend with MongoDB.

---

## Videos

### Screen:

https://github.com/user-attachments/assets/9d916778-f4bb-421c-89cd-e206a4d0d3f1


### Mobile:

https://github.com/user-attachments/assets/c170a408-675a-4d8b-93e4-90441a998f53

---

## Features

- **Supplier Profile Management**: Edit and view supplier information, including emails, origin, and product categories.
- **Product Catalogue**: Upload, edit, and manage product lists via CSV files.
- **Customer Management**: Add, invite, and manage customers, including tracking their status.
- **Order Management**: Generate and view orders based on catalogue and customer data.
- **Authentication**: Secure login and registration with JWT-based authentication.
- **Responsive UI**: Mobile-friendly and adaptive design.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the `backend` directory with the following content:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
   ```

   - Replace `your_jwt_secret_here` with a secure random string.
   - Replace `your_mongodb_connection_string` with your MongoDB URI.

3. **Start the backend server:**

   ```bash
   npm start
   ```

   The backend will run on [https://supply-sooty.vercel.app](https://supply-sooty.vercel.app).

---

## Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend/supply
   npm install
   ```

2. **Start the frontend development server:**

   ```bash
   npm start
   ```

   The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Login/Register**: Access the app at [http://localhost:3000](http://localhost:3000). Register a new supplier account or log in with existing credentials.
- **Supplier Profile**: On login, you are redirected to your profile page. Edit your business details as needed.
- **Catalogue**: Upload your product list as a CSV file. The system parses and displays your products.
- **Customers**: Add and manage your customers. Track their status (active, pending, archived).
- **Orders**: View generated orders based on your catalogue and customers.
- **Payments & Chat**: Manage payments and communicate with customers (if enabled).

---

## Project Structure

