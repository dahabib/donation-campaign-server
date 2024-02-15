import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ReportService } from "./report.service";
import sendResponse from "../../shared/sendResponse";
import { Sale } from "@prisma/client";
import httpStatus from "http-status";

// Get Total Sales
const getAllSales: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReportService.getAllSales();

    sendResponse<Sale[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Total sales fetched !",
      data: result,
    });
  }
);

// Get Sale of Selected date
const getSaleOfSelectedDate: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { date } = req.query;
    const result = await ReportService.getSaleOfSelectedDate(date as string);

    sendResponse<Sale[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sale of selected date fetched successfully!",
      data: result,
    });
  }
);

// Get Sales of Date Range
const getSaleOfDateRange: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { start, end } = req.query;
    type TDateRange = {
      start: string;
      end: string;
    };
    const result = await ReportService.getSaleOfDateRange({
      start,
      end,
    } as TDateRange);

    sendResponse<Sale[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Sales of selected date range fetched successfully!",
      data: result,
    });
  }
);

export const ReportController = {
  getAllSales,
  getSaleOfSelectedDate,
  getSaleOfDateRange,
};
