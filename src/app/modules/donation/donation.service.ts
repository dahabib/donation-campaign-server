import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Donation } from "@prisma/client";

// Add Donation
const createDonation = async (
  user: any,
  payload: Donation
): Promise<Donation> => {
  payload.createdBy = user.id;

  const result = await prisma.donation.create({
    data: payload,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to create a donation!");
  }
  return result;
};

// Get All Donations
const getAllDonation = async (): Promise<Donation[] | null> => {
  const result = await prisma.donation.findMany({});

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No donation found!");
  }
  return result;
};

// Get Single Donation
const getSingleDonation = async (id: string): Promise<Donation | null> => {
  const result = await prisma.donation.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      category: true,
      collections: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Donation Not Found.");
  }
  return result;
};

// Update a donation
const updateDonation = async (
  id: string,
  payload: Partial<Donation>
): Promise<Donation> => {
  const result = await prisma.donation.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delete a donation
const deleteDonation = async (id: string) => {
  const result = await prisma.donation.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No donation found to delete!");
  }
  return result;
};

export const DonationService = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
