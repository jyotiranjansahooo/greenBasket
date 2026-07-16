# Technical Documentation

# Green Basket

## Project Architecture

Green Basket follows a client-server architecture:

Frontend (Next.js) → Backend API (Express.js) → MongoDB Atlas

---

# Tech Stack

## Frontend

- Next.js 16
- React
- Tailwind CSS
- React Query
- Axios
- React Hook Form
- React Hot Toast
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google OAuth
- Razorpay

## Database

- MongoDB Atlas

## Deployment

- Frontend: Vercel
- Backend: Render / Railway

---

# Folder Structure

```text
greenBasket/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   └── lib/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── uploads/
```

---

# Database Models

## User

- name
- email
- password
- role
- profileImage
- address
- isVerified

## Product

- name
- description
- price
- quantity
- category
- farmer
- images
- farmingMethod
- harvestDate
- origin

## Order

- customer
- farmer
- products
- totalAmount
- status
- paymentMethod
- paymentStatus
- deliveryAddress
- deliverySlot

## Cart

- user
- items

## Review

- user
- product
- rating
- comment

## Category

- name

---

# Authentication Flow

1. User registers or logs in.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is stored in cookies.
5. Protected routes verify the token.

---

# API Modules

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
GET /api/auth/profile
POST /api/auth/logout
```

## Products

```text
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

## Orders

```text
POST /api/orders
GET /api/orders/my
GET /api/orders/farmer
PUT /api/orders/:id/status
```

## Cart

```text
GET /api/cart
POST /api/cart/add
DELETE /api/cart/remove
```

## Reviews

```text
POST /api/reviews
GET /api/reviews/:productId
```

---

# Payment Integration

Green Basket uses Razorpay.

Supported methods:

- UPI
- Debit Card
- Credit Card
- Net Banking
- Wallets

Payment flow:

1. Customer selects Online Payment.
2. Backend creates Razorpay order.
3. Razorpay checkout opens.
4. Payment is verified.
5. Order status is updated.

---

# Security

- JWT authentication
- Protected routes
- Role-based authorization
- Password hashing
- Cookie security
- Input validation

---

# Future Improvements

- Live order tracking
- Chat system
- Weather integration
- AI recommendations
- Multi-language support
- Push notifications