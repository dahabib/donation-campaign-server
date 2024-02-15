/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import config from "../../config";
import ApiError from "../../errors/apiError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import { Prisma } from "@prisma/client";
import handleValidationError from "../../errors/handleValidationError";
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log("globalErrorHandler ~~ ", error)
    : console.log("globalErrorHandler ~~ ", error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessage: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
