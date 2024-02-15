import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { CampaignService } from "./campaign.service";
import sendResponse from "../../shared/sendResponse";
import { Campaign } from "@prisma/client";
import httpStatus from "http-status";

// Create a campaign
const createCampaign: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await CampaignService.createCampaign(user, req.body);

    sendResponse<Campaign>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign created successfully!",
      data: result,
    });
  }
);

// Get All Campaigns
const getAllCampaign: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CampaignService.getAllCampaign();

    sendResponse<Campaign[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaigns fetched successfully!",
      data: result,
    });
  }
);

// Get Single Campaign
const getSingleCampaign: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CampaignService.getSingleCampaign(id);

    sendResponse<Campaign>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign fetched successfully!",
      data: result,
    });
  }
);

// Update Campaign
const updateCampaign: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    console.log(id, payload);
    const result = await CampaignService.updateCampaign(id, payload);

    sendResponse<Campaign>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign updated successfully!",
      data: result,
    });
  }
);

// Delete Campaign
const deleteCampaign: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CampaignService.deleteCampaign(id);

    sendResponse<Campaign>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign deleted successfully!",
      data: result,
    });
  }
);

export const CampaignController = {
  createCampaign,
  getAllCampaign,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
};
