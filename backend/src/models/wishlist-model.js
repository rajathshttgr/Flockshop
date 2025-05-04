import pool from "../config/db.js";

export const getAllWishlistsService = async () => {
  const result = await pool.query("SELECT * FROM wishlists");
  return result.rows;
};

export const getWishlistByIdService = async (wishlist_id) => {
  const result = await pool.query(
    "SELECT * FROM wishlists WHERE wishlist_id = $1",
    [wishlist_id]
  );
  return result.rows;
};

export const createWishlistService = async (
  wishlist_id,
  name,
  created_by,
  is_private
) => {
  const result = await pool.query(
    "INSERT INTO wishlists (wishlist_id, name, created_by, is_private) VALUES ($1, $2, $3, $4) RETURNING *",
    [wishlist_id, name, created_by, is_private]
  );
  return result.rows[0];
};

export const getProductsByWishlistIdService = async (wishlist_id) => {
  const result = await pool.query(
    `SELECT wp.*, p.product_name, p.price, p.image_url 
     FROM wishlist_products wp
     JOIN products p ON wp.product_id = p.product_id
     WHERE wp.wishlist_id = $1`,
    [wishlist_id]
  );
  return result.rows;
};

export const deleteProductByIdFromWishlistService = async (
  wishlist_id,
  product_id
) => {
  const result = await pool.query(
    `DELETE FROM wishlist_products 
     WHERE wishlist_id = $1 AND product_id = $2`,
    [wishlist_id, product_id]
  );
  return result.rowCount > 0; // Returns true if a row was deleted
};

export const addProductToWishlistService = async (
  wishlist_id,
  product_id,
  added_by
) => {
  const result = await pool.query(
    `INSERT INTO wishlist_products (wishlist_id, product_id, added_by) 
     VALUES ($1, $2, $3) RETURNING *`,
    [wishlist_id, product_id, added_by]
  );
  return result.rows[0];
};

export const getAllWishlistsByUserIdService = async (username) => {
  const result = await pool.query(
    `(
        SELECT * 
        FROM wishlists 
        WHERE created_by = $1
      )
      UNION
      (
        SELECT w.* 
        FROM wishlists w
        JOIN wishlist_followers wf ON w.wishlist_id = wf.wishlist_id
        WHERE wf.followed_by = $1
      )`,
    [username]
  );
  return result.rows;
};

export const deleteWishlistByIdService = async (wishlist_id) => {
  const result = await pool.query(
    `DELETE FROM wishlists 
     WHERE wishlist_id = $1`,
    [wishlist_id]
  );
  return result.rowCount > 0;
};

export const addFollowerToListService = async (wishlist_id, user_id) => {
  const result = await pool.query(
    `INSERT INTO wishlist_followers (wishlist_id, followed_by) 
       VALUES ($1, $2) RETURNING *`,
    [wishlist_id, user_id]
  );
  return result.rows[0];
};
