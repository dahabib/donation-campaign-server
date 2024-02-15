import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { CollectionService } from "./collection.service";
import sendResponse from "../../shared/sendResponse";
import { Collection } from "@prisma/client";
import httpStatus from "http-status";

const createCollection: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CollectionService.createCollection(req.body);

    sendResponse<Collection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation added to collection",
      data: result,
    });
  }
);

// Get All Collections
const getAllCollection: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CollectionService.getAllCollection();

    sendResponse<Collection[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Collections fetched successfully!",
      data: result,
    });
  }
);

// Get Single Collection
const getSingleCollection: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CollectionService.getSingleCollection(id);

    sendResponse<Collection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Collection information fetched",
      data: result,
    });
  }
);

// Update Collection Information
const updateCollection: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    const result = await CollectionService.updateCollection(id, payload);

    sendResponse<Collection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Collection information updated successfully!",
      data: result,
    });
  }
);

// Delete Collection
const deleteCollection: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CollectionService.deleteCollection(id);

    sendResponse<Collection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Collection information deleted successfully!",
      data: result,
    });
  }
);

export const CollectionController = {
  createCollection,
  getAllCollection,
  getSingleCollection,
  updateCollection,
  deleteCollection,
};
