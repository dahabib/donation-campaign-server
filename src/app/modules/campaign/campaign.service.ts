import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Campaign } from "@prisma/client";

// Add Campaign
const createCampaign = async (
  user: any,
  payload: Campaign
): Promise<Campaign> => {
  payload.categoryId = user.id;

  const result = await prisma.campaign.create({
    data: payload,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to create a campaign!");
  }
  return result;
};

// Get All Campaign
const getAllCampaign = async (): Promise<Campaign[] | null> => {
  const result = await prisma.campaign.findMany({});

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No campaign found!");
  }
  return result;
};

// Get Single Campaign
const getSingleCampaign = async (id: string): Promise<Campaign | null> => {
  const result = await prisma.campaign.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      category: true,
      donations: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Campaign Not Found.");
  }
  return result;
};

// Update a campaign
const updateCampaign = async (
  id: string,
  payload: Partial<Campaign>
): Promise<Campaign> => {
  const result = await prisma.campaign.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delete a campaign
const deleteCampaign = async (id: string) => {
  const result = await prisma.campaign.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No campaign found to delete!");
  }
  return result;
};

export const CampaignService = {
  createCampaign,
  getAllCampaign,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
};
