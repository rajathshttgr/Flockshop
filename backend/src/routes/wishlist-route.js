import express from "express";
import { getAllWishlists } from "../controllers/wishlistController.js";

import { createWishlist } from "../controllers/wishlistController.js";
import { getProductsByWishlistId } from "../controllers/wishlistController.js";
import { deleteProductByIdFromWishlist } from "../controllers/wishlistController.js";
import { addProductToWishlist } from "../controllers/wishlistController.js";
import { getAllWishlistsbyUserId } from "../controllers/wishlistController.js";
import { deleteWishistById } from "../controllers/wishlistController.js";

import { getWishlistByWishlistId } from "../controllers/wishlistController.js";
import { addFollowerToList } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wishlist route is working");
});

router.get("/wishlists", getAllWishlists);
router.get("/wishlists/:user_id", getAllWishlistsbyUserId);

router.get("/wishlists/:wishlist_id", getWishlistByWishlistId);

router.delete("/wishlists/:wishlist_id", deleteWishistById);
router.post("/wishlists", createWishlist);

//products
router.get("/products/:wishlist_id", getProductsByWishlistId);
router.delete(
  "/products/:wishlist_id/:product_id",
  deleteProductByIdFromWishlist
);
router.post("/products", addProductToWishlist);

//followers
router.post("/follower", addFollowerToList);

export default router;
