import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../shared/sendResponse";
import { Product } from "@prisma/client";
import httpStatus from "http-status";

const addProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ProductService.addProduct(user, req.body);

    sendResponse<Product>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product added successfully!",
      data: result,
    });
  }
);

// Get All Product
const getAllProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.getAllProduct();

    sendResponse<Product[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  }
);

// Get Single Product
const getProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getProduct(id);

    sendResponse<Product>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  }
);

// Update Product
const updateProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    console.log(id, payload);
    const result = await ProductService.updateProduct(id, payload);

    sendResponse<Product>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products updated successfully!",
      data: result,
    });
  }
);

// Delete Product
const deleteProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);

    sendResponse<Product>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products deleted successfully!",
      data: result,
    });
  }
);

// Delete Many Product
const deleteMultiple: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    const result = await ProductService.deleteMultiple(payload);

    sendResponse<unknown>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products deleted successfully!",
      data: result,
    });
  }
);

export const ProductController = {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteMultiple,
};
