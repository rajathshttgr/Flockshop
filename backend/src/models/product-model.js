import pool from "../config/db.js";

export const getAllProductsService = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

export const getProductByProductIdService = async (product_id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE product_id =$1",
    [product_id]
  );
  return result.rows[0];
};
