import pool from "../config/db.js";

export const signupUserService = async (
  fullname,
  username,
  email,
  password
) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullname, username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username =$1", [
    username,
  ]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);
  return result.rows[0];
};
