// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import productsRoutes from "./routes/products-routes.js";
import wishlistRoutes from "./routes/wishlist-route.js";
import errorHandler from "./middlewares/errorHandler.js";
import listsRoutes from "./routes/list-routes.js";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/list", listsRoutes);

//Error handling middlewar
app.use(errorHandler);

//Testing the database connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

export default app;
