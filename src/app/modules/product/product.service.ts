import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Product } from "@prisma/client";

// Add Product
const addProduct = async (user: any, payload: Product): Promise<Product> => {
  const {
    productName,
    price,
    stock,
    condition,
    productType,
    brand,
    size,
    material,
    color,
    weight,
  } = payload;

  const result = await prisma.product.create({
    data: {
      productName,
      price,
      stock,
      condition,
      productType,
      brand,
      size,
      material,
      color,
      weight,
      createdBy: user.id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No product found!");
  }
  return result;
};

// Get All Product
const getAllProduct = async (): Promise<Product[] | null> => {
  const result = await prisma.product.findMany({});

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No product found!");
  }
  return result;
};

// Get product by ID
const getProduct = async (id: string): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      sales: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found.");
  }
  return result;
};

// Update Product
const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delete Product
const deleteProduct = async (id: string) => {
  const result = await prisma.product.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Product Found to delete!");
  }
  return result;
};

// Delete Many

const deleteMultiple = async (payload: string[]) => {
  const idsToDelete = Object.values(payload);

  const result = await prisma.product.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
  return result;
};

export const ProductService = {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteMultiple,
};
