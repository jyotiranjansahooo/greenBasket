# Product Requirements Document (PRD)

# Green Basket

Version: 1.0

---

# 1. Project Overview

Green Basket is a farm-to-consumer e-commerce platform that connects local farmers directly with customers. The platform eliminates intermediaries and enables consumers to purchase fresh and organic products while helping farmers increase their income.

The application provides separate dashboards for farmers, customers, and administrators, ensuring efficient management of products, orders, payments, and analytics.

---

# 2. Problem Statement

Traditional agricultural supply chains rely heavily on intermediaries, reducing farmers' profits and increasing prices for consumers.

Current challenges include:

- Farmers receive lower profits.
- Consumers lack access to fresh produce.
- Limited transparency in pricing.
- Difficulty for small farmers to reach customers.
- Lack of digital infrastructure.

Green Basket addresses these problems by creating a direct marketplace between farmers and consumers.

---

# 3. Objectives

The main objectives of Green Basket are:

- Connect farmers directly with consumers.
- Promote local and organic farming.
- Increase farmer revenue.
- Provide a transparent marketplace.
- Simplify online ordering and payments.
- Improve customer satisfaction.
- Encourage sustainable agriculture.

---

# 4. User Roles

The system supports three user roles:

## 4.1 Customer

Customers can:

- Register and log in.
- Browse products.
- Search and filter products.
- Add products to the cart.
- Place orders.
- Make online payments.
- Track orders.
- Leave ratings and reviews.
- Manage profile information.

---

## 4.2 Farmer

Farmers can:

- Register and create farm profiles.
- Add products.
- Update products.
- Delete products.
- Manage inventory.
- Update stock levels.
- View incoming orders.
- Update order status.
- Track revenue and analytics.

---

## 4.3 Administrator

Administrators can:

- Manage users.
- Verify farmers.
- Monitor orders.
- Manage featured products.
- View analytics and KPIs.
- Manage categories.
- Monitor platform growth.

---

# 5. Core Features

## Authentication

- Email/password login.
- Google OAuth login.
- JWT authentication.
- Secure cookies.

---

## Product Management

- Add products.
- Edit products.
- Delete products.
- Upload images.
- Inventory management.
- Category selection.
- Farming method tagging.

---

## Shopping Experience

- Product listing.
- Product details page.
- Search functionality.
- Filtering options.
- Cart management.
- Checkout process.

---

## Order Management

- Place orders.
- Track order status.
- Cancel orders.
- View order history.
- Delivery slot selection.

---

## Payment System

- Cash on Delivery (COD).
- Razorpay integration.
- UPI and online payment support.
- Payment status tracking.

---

## Review System

- Product ratings.
- Customer reviews.
- Review restrictions based on purchases.

---

## Analytics Dashboard

### Farmer Analytics

- Total products.
- Total orders.
- Revenue.
- Pending orders.
- Delivered orders.
- Inventory alerts.

### Admin Analytics

- Total customers.
- Total farmers.
- Verified farmers.
- Total products.
- Categories.
- Orders.
- Revenue.

---

# 6. Key Performance Indicators (KPIs)

The platform tracks the following KPIs:

| KPI | Description |
|------|------|
| Number of onboarded farmers | Total registered farmers |
| Number of active consumers | Customers who place orders |
| Order fulfilment rate | Delivered orders percentage |
| Repeat customer rate | Customers who place multiple orders |
| Total revenue | Platform revenue |

---

# 7. Functional Requirements

## Customer Requirements

- Customers must register and log in.
- Customers can browse products.
- Customers can add products to the cart.
- Customers can place orders.
- Customers can make payments.
- Customers can review purchased products.

---

## Farmer Requirements

- Farmers can manage inventory.
- Farmers can manage products.
- Farmers can update stock.
- Farmers can track orders.
- Farmers can monitor earnings.

---

## Admin Requirements

- Admins can verify farmers.
- Admins can manage products.
- Admins can monitor orders.
- Admins can view analytics.

---

# 8. Non-Functional Requirements

## Performance

- Fast page loading.
- Optimized images.
- Responsive design.

## Security

- JWT authentication.
- Secure cookies.
- Protected routes.
- Role-based authorization.

## Scalability

- Modular architecture.
- API-driven design.
- Expandable database schema.

## Usability

- Mobile responsive.
- User-friendly interface.
- Accessible navigation.

---

# 9. Technology Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- React Query
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- Google OAuth

## Payment

- Razorpay

## Deployment

- Vercel

---

# 10. Database Models

The system includes:

- User
- Product
- Category
- Cart
- Order
- Review

---

# 11. Future Enhancements

Potential future improvements:

- AI product recommendations.
- Real-time notifications.
- Farmer chat support.
- Weather integration.
- Subscription plans.
- Multi-language support.
- Sales reports and exports.
- Delivery tracking.

---

# 12. Deliverables

The final project includes:

- Functional web application.
- Farmer dashboard.
- Customer dashboard.
- Admin dashboard.
- PRD documentation.
- Technical documentation.
- Deployment-ready build.

---

# 13. Conclusion

Green Basket provides a digital marketplace that empowers farmers and offers customers access to fresh and organic products. By connecting both parties directly, the platform promotes sustainability, transparency, and economic growth in the agricultural sector.
