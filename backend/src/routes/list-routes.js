import express from "express";
const router = express.Router();
import { getWishlistsById } from "../controllers/listcontroller.js";

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.get("/wishlists/:wishlist_id", getWishlistsById);

export default router;
