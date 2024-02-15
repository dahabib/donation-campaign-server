import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DonationService } from "./donation.service";
import sendResponse from "../../shared/sendResponse";
import { Donation } from "@prisma/client";
import httpStatus from "http-status";

// Create a donation
const createDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await DonationService.createDonation(user, req.body);

    sendResponse<Donation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation created successfully!",
      data: result,
    });
  }
);

// Get All Donations
const getAllDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DonationService.getAllDonation();

    sendResponse<Donation[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation fetched successfully!",
      data: result,
    });
  }
);

// Get Single Donation
const getSingleDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DonationService.getSingleDonation(id);

    sendResponse<Donation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation fetched successfully!",
      data: result,
    });
  }
);

// Update Donation
const updateDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    console.log(id, payload);
    const result = await DonationService.updateDonation(id, payload);

    sendResponse<Donation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation updated successfully!",
      data: result,
    });
  }
);

// Delete Donation
const deleteDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DonationService.deleteDonation(id);

    sendResponse<Donation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation deleted successfully!",
      data: result,
    });
  }
);

export const DonationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
