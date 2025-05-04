# FlockShop.ai – Assignment

This repository contains my submission for the **FlockShop.ai Assignment**. The goal of this assignment was to build a "Shared Wishlist App" where users can collaboratively create and manage wishlists in real-time.

---

## Assignment Overview

### Features Implemented

#### Frontend

- **Sign Up & Log In**: Dummy authentication implemented.
- **Wishlist Management**:
  - Create, edit, and delete wishlists.
  - Add, edit, and remove products (name, image URL, price).
  - Display the user who added each product.
- **Invite Users**: Mocked functionality to invite others to a wishlist.
- **Responsive Design**: Mobile-friendly UI using TailwindCSS.

#### Backend

- **APIs**:
  - User authentication (mocked).
  - CRUD operations for wishlists and products.
  - Track user actions (who created/edited items).
- **Database**: PostgreSQL used to store user data, wishlists, and product details.

#### Bonus Features

- **Real-Time Sync**: Implemented using WebSockets for collaborative updates.
- **Comments & Reactions**: Added emoji reactions for wishlist items.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- PostgreSQL database set up.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rajathshttgr/flockshop.git
   cd flockshop
   ```

2. **Install Dependencies**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**

   - Backend `.env`:
     ```
     PORT=4000
     JWT_SECRET="SECRETKEY"
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=admin
     DB_PASSWORD=admin123
     DB_NAME=flockshopdb
     DATABASE_URL="postgresql://admin:admin123@localhost:5432/flockshopdb"
     ```
   - Frontend `.env.local`:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:4000/api
     ```

4. **Run the Applications**

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4000`

---

## Tech Stack

### Frontend

- **Framework**: Next.js (React)
- **Styling**: TailwindCSS
- **Language**: TypeScript

### Backend

- **Framework**: Node.js with Express
- **Database**: PostgreSQL

### Additional Tools

- **Real-Time Sync**: WebSockets
- **Environment Management**: dotenv
- **Version Control**: Git

---

## Assumptions & Limitations

- Authentication is mocked for simplicity.
- Invite functionality is not fully implemented.
- Real-time sync is limited to wishlist updates.

---

## Screenshots & Demo

- Screenshots of the app are included in the `screenshots` folder.
- [Watch the Loom Video Demo](https://www.loom.com/share/0055a24f7a8549dd939d04a11841731f?sid=04626d2c-7b11-4c72-b3a6-8fda3d8fac47)

---

## Thoughts on Scaling

- Implement a microservices architecture for scalability.
- Use Redis for caching frequently accessed data.

---

Thank you for reviewing my submission!
