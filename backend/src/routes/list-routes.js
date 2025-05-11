import express from "express";
const router = express.Router();
import { getWishlistsById } from "../controllers/listcontroller.js";
import { removelistById } from "../controllers/listcontroller.js";

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.get("/wishlists/:wishlist_id", getWishlistsById);
router.delete("/wishlists/:wishlist_id", removelistById);

export default router;
