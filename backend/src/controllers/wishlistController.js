import { getAllWishlistsService } from "../models/wishlist-model.js";
import { getWishlistByIdService } from "../models/wishlist-model.js";
import { createWishlistService } from "../models/wishlist-model.js";
import { getProductsByWishlistIdService } from "../models/wishlist-model.js";
import { deleteProductByIdFromWishlistService } from "../models/wishlist-model.js";
import { addProductToWishlistService } from "../models/wishlist-model.js";
import { getAllWishlistsByUserIdService } from "../models/wishlist-model.js";
import { deleteWishlistByIdService } from "../models/wishlist-model.js";
import { addFollowerToListService } from "../models/wishlist-model.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// Function to generate a 32-bit hex wishlist_id (8 characters)
function generateWishlistId() {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, "0");
}

export const getAllWishlists = async (req, res, next) => {
  try {
    const wishlists = await getAllWishlistsService();
    console.log(wishlists);

    if (wishlists) {
      handleResponse(res, 200, "Data fetched Sucessfully", wishlists);
    } else {
      handleResponse(res, 200, "Unable to fetch data");
    }
  } catch (err) {
    next(err);
  }
};

export const getWishlistByWishlistId = async (req, res, next) => {
  const { wishlist_id } = req.params;
  console.log(wishlist_id);
  try {
    const wishlist = await getWishlistByIdService(wishlist_id);
    console.log(wishlist);

    if (wishlist) {
      handleResponse(res, 200, "Data fetched successfully", wishlist);
    } else {
      handleResponse(res, 200, "Unable to fetch wishlist");
    }
  } catch (err) {
    next(err);
  }
};

export const createWishlist = async (req, res, next) => {
  const { name, created_by, is_private } = req.body;

  try {
    const wishlist_id = generateWishlistId();
    const wishlist = await createWishlistService(
      wishlist_id,
      name,
      created_by,
      is_private
    );

    handleResponse(res, 201, "Collection Created", wishlist);
  } catch (error) {
    next(error);
  }
};

export const getProductsByWishlistId = async (req, res, next) => {
  const { wishlist_id } = req.params;
  console.log(wishlist_id);

  try {
    const products = await getProductsByWishlistIdService(wishlist_id);
    console.log(products);

    if (products) {
      handleResponse(res, 200, "Data fetched successfully", products);
    } else {
      handleResponse(res, 200, "Unable to fetch products");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProductByIdFromWishlist = async (req, res, next) => {
  const { wishlist_id, product_id } = req.params;
  console.log(wishlist_id, product_id);

  try {
    const result = await deleteProductByIdFromWishlistService(
      wishlist_id,
      product_id
    );
    console.log(result);

    if (result) {
      handleResponse(res, 200, "Product deleted successfully", result);
    } else {
      handleResponse(res, 200, "Unable to delete product");
    }
  } catch (err) {
    next(err);
  }
};

export const addProductToWishlist = async (req, res, next) => {
  const { wishlist_id, product_id, username } = req.body;

  if (!username) {
    return handleResponse(res, 400, "Username is required");
  }

  console.log(wishlist_id, product_id, username);

  try {
    const result = await addProductToWishlistService(
      wishlist_id,
      product_id,
      username
    );
    console.log(result);

    if (result) {
      handleResponse(res, 201, "Product added to wishlist", result);
    } else {
      handleResponse(res, 200, "Unable to add product to wishlist");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllWishlistsbyUserId = async (req, res, next) => {
  const { user_id } = req.params;
  console.log(user_id);

  try {
    const wishlists = await getAllWishlistsByUserIdService(user_id);
    console.log(wishlists);

    if (wishlists) {
      handleResponse(res, 200, "Data fetched Sucessfully", wishlists);
    } else {
      handleResponse(res, 200, "Unable to fetch data");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteWishistById = async (req, res, next) => {
  const { wishlist_id } = req.params;
  console.log(wishlist_id);

  try {
    const result = await deleteWishlistByIdService(wishlist_id);
    console.log(result);

    if (result) {
      handleResponse(res, 200, "Wishlist deleted successfully", result);
    } else {
      handleResponse(res, 200, "Unable to delete wishlist");
    }
  } catch (err) {
    next(err);
  }
};

export const addFollowerToList = async (req, res, next) => {
  const { wishlist_id, user_id } = req.body;
  try {
    const result = await addFollowerToListService(wishlist_id, user_id);
    console.log(result);

    if (result) {
      handleResponse(res, 200, "Successfully followed wishlist", result);
    } else {
      handleResponse(res, 200, "failed to add follower");
    }
  } catch (err) {
    next(err);
  }
};
