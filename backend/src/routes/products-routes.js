import express from "express";
import { getAllProducts } from "../controllers/productsController.js";
import { getProductByProductId } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Products route is working");
});

router.get("/products", getAllProducts);
router.get("/products/:product_id", getProductByProductId);

export default router;
