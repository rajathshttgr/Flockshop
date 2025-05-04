import pool from "../config/db.js";
import fs from "fs";
import path from "path";

export const createTables = async () => {
  const queryTextUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_deleted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const queryTextProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      serial_id INTEGER,
      product_name TEXT NOT NULL,
      price NUMERIC NOT NULL,
      product_id TEXT UNIQUE NOT NULL,
      image_url TEXT
    );
  `;

  const queryWishlistsTable = `
CREATE TABLE IF NOT EXISTS wishlists (
  id SERIAL PRIMARY KEY,                 
  wishlist_id TEXT UNIQUE NOT NULL,    
  name VARCHAR(100) NOT NULL,              
  created_by VARCHAR(100) NOT NULL,    
  is_private VARCHAR(10) NOT NULL DEFAULT 'public' CHECK (is_private IN ('private', 'public')), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(username) ON DELETE CASCADE  
);
 `;

  const queryWishlistsProductsTable = `
 CREATE TABLE IF NOT EXISTS wishlist_products (
    id SERIAL PRIMARY KEY,                          -- Auto-incrementing serial id as primary key
    wishlist_id TEXT NOT NULL,                      -- Foreign key to wishlists table
    product_id TEXT NOT NULL,                       -- Foreign key to products table
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp of when the product was added
    added_by VARCHAR(100) NOT NULL, -- Foreign key to users table (user who added the product, default to 'system')
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(wishlist_id) ON DELETE RESTRICT,  
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,   
    FOREIGN KEY (added_by) REFERENCES users(username) ON DELETE RESTRICT            
);
    `;

  const queyWishlistFollowers = `
    CREATE TABLE IF NOT EXISTS wishlist_followers(
    id SERIAL PRIMARY KEY,
    wishlist_id TEXT NOT NULL,
    followed_by VARCHAR(100) NOT NULL,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(wishlist_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_by) REFERENCES users(username) ON DELETE CASCADE
    )
    `;

  try {
    // Create users table
    await pool.query(queryTextUserTable);
    console.log("User table created if not exists");

    // Create products table
    await pool.query(queryTextProductsTable);
    console.log("Products table created if not exists");

    //create wishlists table
    await pool.query(queryWishlistsTable);
    console.log("Wishlists table created if not exists");

    //create wishlist_products table
    await pool.query(queryWishlistsProductsTable);
    console.log("Wishlist products table created if not exists");

    //create wishlist_followers table
    await pool.query(queyWishlistFollowers);
    console.log("Wishlist followers table created if not exists");

    // Check if products table is empty
    const res = await pool.query("SELECT COUNT(*) FROM products;");
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
      console.log("Seeding products table from JSON...");

      const productsData = JSON.parse(
        fs.readFileSync(
          path.join(path.resolve(), "data/productsdata.json"),
          "utf8"
        )
      );

      for (const product of productsData) {
        await pool.query(
          `INSERT INTO products (serial_id, product_name, price, product_id, image_url)
           VALUES ($1, $2, $3, $4, $5);`,
          [
            product.serial_id,
            product.product_name,
            product.price,
            product.product_id,
            product.image_url,
          ]
        );
      }

      console.log("Seeding completed.");
    } else {
      console.log("Products table already has data. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error setting up tables and seeding:", error);
    throw error;
  }
};
