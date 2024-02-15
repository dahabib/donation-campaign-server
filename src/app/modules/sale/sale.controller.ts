import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { SaleService } from "./sale.service";
import sendResponse from "../../shared/sendResponse";
import { Sale } from "@prisma/client";
import httpStatus from "http-status";

const addSale: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SaleService.addSale(req.body);

    sendResponse<Sale>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product added to sale successfully!",
      data: result,
    });
  }
);

// Get All Sales
const getSales: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SaleService.getSales();

    sendResponse<Sale[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sales fetched successfully!",
      data: result,
    });
  }
);

// Get Single Sale
const getSingleSale: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SaleService.getSingleSale(id);

    sendResponse<Sale>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sale fetched successfully!",
      data: result,
    });
  }
);

// Update Sale
const updateSale: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    const result = await SaleService.updateSale(id, payload);

    sendResponse<Sale>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sale updated successfully!",
      data: result,
    });
  }
);

// Delete Sale
const deleteSale: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SaleService.deleteSale(id);

    sendResponse<Sale>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sale deleted successfully!",
      data: result,
    });
  }
);

export const SaleController = {
  addSale,
  getSales,
  getSingleSale,
  updateSale,
  deleteSale,
};
