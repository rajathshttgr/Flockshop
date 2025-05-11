import { getWishlistsByIdService } from "../models/list-model.js";
import { removelistByIdService } from "../models/list-model.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getWishlistsById = async (req, res, next) => {
  const { wishlist_id } = req.params;
  console.log(wishlist_id);

  try {
    const result = await getWishlistsByIdService(wishlist_id);
    console.log(result);

    if (result) {
      handleResponse(res, 200, "data fetched successfully", result);
    } else {
      handleResponse(res, 200, "unable to fetch data");
    }
  } catch (err) {
    next(err);
  }
};

export const removelistById = async (req, res, next) => {
  const { wishlist_id } = req.params;
  console.log(wishlist_id);
  try {
    const response = await removelistByIdService(wishlist_id);
    console.log(response);

    if (result) {
      handleResponse(res, 200, "Wishlist deleted succesfully", result);
    } else {
      handleResponse(res, 200, "failed to delete");
    }
  } catch (err) {
    next(err);
  }
};
