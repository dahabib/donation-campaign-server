import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { IRegisterUserResponse, IUser } from "./user.interface";

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.registerUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  }
);

// Get User Profile
const getProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await UserService.getProfile(refreshToken);

    sendResponse<IRegisterUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "Profile data fetched successfully !",
      data: result,
    });
  }
);

// Get Users
const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await UserService.getUsers();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users data fetched successfully !",
      data: result,
    });
  }
);

export const UserController = {
  registerUser,
  getUsers,
  getProfile,
};
