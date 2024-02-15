import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { Sale } from "@prisma/client";

// Get All Sales
const getAllSales = async (): Promise<Sale[] | null> => {
  const totalSale = await prisma.sale.findMany({
    include: {
      Product: true,
      buyer: true,
    },
  });

  return totalSale;
};

// Get Report of a single day
const getSaleOfSelectedDate = async (
  selectedDate: string
): Promise<Sale[] | null> => {
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await prisma.sale.findMany({
    where: {
      dateOfSale: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      Product: true,
      buyer: true,
    },
  });

  return result;
};

// Get Sales of Selected date range
const getSaleOfDateRange = async (payload: {
  start: string;
  end: string;
}): Promise<Sale[] | null> => {
  const startOfDay = new Date(payload.start);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(payload.end);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await prisma.sale.findMany({
    where: {
      dateOfSale: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      Product: true,
      buyer: true,
    },
  });

  return result;
};

export const ReportService = {
  getAllSales,
  getSaleOfSelectedDate,
  getSaleOfDateRange,
};
