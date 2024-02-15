import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Sale } from "@prisma/client";

// Add Sale
const addSale = async (payload: Sale): Promise<Sale> => {
  const result = await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({ data: payload });

    // Update product stock after sale is created
    const updatedStock = await tx.product.update({
      where: { id: payload.productId },
      data: {
        stock: {
          decrement: payload.quantity,
        },
      },
    });

    // Delete product if stock is 0
    if (updatedStock.stock === 0) {
      await tx.product.delete({
        where: { id: payload.productId },
      });
    }

    return sale;
  });

  return result;
};

// Get All Sales
const getSales = async (): Promise<Sale[] | null> => {
  const result = await prisma.sale.findMany({});

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No sale found!");
  }
  return result;
};

// Get Single Sale
const getSingleSale = async (id: string): Promise<Sale | null> => {
  const result = await prisma.sale.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Sale Not Found.");
  }
  return result;
};

// Update Sale
const updateSale = async (
  id: string,
  payload: Partial<Sale>
): Promise<Sale> => {
  const result = await prisma.sale.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// Delete Sale
const deleteSale = async (id: string) => {
  const result = await prisma.sale.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Sale Found to delete!");
  }
  return result;
};

export const SaleService = {
  addSale,
  getSales,
  getSingleSale,
  updateSale,
  deleteSale,
};
