import pool from "../config/db.js";

export const getWishlistsByIdService = async (wishlist_id) => {
  const result = await pool.query(
    "SELECT * FROM wishlists WHERE wishlist_id =$1",
    [wishlist_id]
  );
  return result.rows[0];
};

export const removelistByIdService = async (wishlist_id) => {
  const result = await pool.query(
    `DELETE FROM wishlists 
     WHERE wishlist_id = $1`,
    [wishlist_id]
  );
  return result.rowCount > 0;
};
