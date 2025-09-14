# FlockShop.ai – Assignment

## Screenshots & Demo

- Screenshots of the app are available in the [screenshots](./screenshots) folder.
- 🎥 [Watch the Loom Video Demo](https://www.loom.com/share/0055a24f7a8549dd939d04a11841731f?sid=04626d2c-7b11-4c72-b3a6-8fda3d8fac47)

---

## Assignment Overview

### Features Implemented

#### Frontend

- **Sign Up & Log In**: Authentication.
- **Wishlist Management**:
  - Create, edit, and delete wishlists.
  - Add, edit, and remove products (name, image URL, price).
  - Display the user who added each product.
- **Invite Users**: Functionality to invite others to a wishlist.
- **Responsive Design**: Mobile-friendly UI using TailwindCSS.

#### Backend

- **APIs**:
  - User authentication.
  - CRUD operations for wishlists and products.
  - Track user actions (who created/edited items).
- **Database**: PostgreSQL used to store user data, wishlists, and product details.

#### Other Features

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
     DB_USER=<username>
     DB_PASSWORD=<password>
     DB_NAME=flockshopdb
     DATABASE_URL=postgresql://<username>:<password>@localhost:5432/flockshopdb

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
