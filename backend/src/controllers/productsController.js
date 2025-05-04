import { getAllProductsService } from "../models/product-model.js";
import { getProductByProductIdService } from "../models/product-model.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    console.log(products);

    if (products) {
      handleResponse(res, 200, "Data fetched Sucessfully", products);
    } else {
      handleResponse(res, 200, "Unable to fetch data");
    }
  } catch (err) {
    next(err);
  }
};

export const getProductByProductId = async (req, res, next) => {
  const { product_id } = req.params;
  console.log(product_id);

  try {
    const product = await getProductByProductIdService(product_id);
    console.log(product);

    if (product) {
      handleResponse(res, 200, "Data fetched successfully", product);
    } else {
      handleResponse(res, 200, "Unable fetch product");
    }
  } catch (err) {
    next(err);
  }
};
