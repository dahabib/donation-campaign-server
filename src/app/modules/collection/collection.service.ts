import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Collection } from "@prisma/client";

// Add Collection
const createCollection = async (payload: Collection): Promise<Collection> => {
  const result = await prisma.$transaction(async (tx) => {
    const collection = await tx.collection.create({ data: payload });

    // Update donatioin after collection is created
    try {
      await tx.donation.update({
        where: { id: payload.donationId },
        data: {
          totalCollected: {
            increment: payload.donationAmount,
          },
        },
      });
    } catch (error) {
      throw new ApiError(500, "Something went wrong!");
    }

    return collection;
  });

  return result;
};

// Get All Collections
const getAllCollection = async (): Promise<Collection[] | null> => {
  const result = await prisma.collection.findMany({});

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No collection found!");
  }
  return result;
};

// Get Single Collection
const getSingleCollection = async (id: string): Promise<Collection | null> => {
  const result = await prisma.collection.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Collection Not Found.");
  }
  return result;
};

// Update Collection
const updateCollection = async (
  id: string,
  payload: Partial<Collection>
): Promise<Collection> => {
  const result = await prisma.collection.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delete Collection
const deleteCollection = async (id: string) => {
  const result = await prisma.collection.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No collection found to delete!");
  }
  return result;
};

export const CollectionService = {
  createCollection,
  getAllCollection,
  getSingleCollection,
  updateCollection,
  deleteCollection,
};
