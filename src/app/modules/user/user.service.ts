import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../utils/prisma";
import { IRegisterUser, IRegisterUserResponse } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { exclude } from "../../../helpers/excludeFIends";

// Register User
const registerUser = async (
  payload: IRegisterUser
): Promise<IRegisterUserResponse | undefined> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User already exists with this email !"
    );
  }

  const hashPassword = async (password: string, salt: number) => {
    return await bcrypt.hash(password, salt);
  };

  payload.password = await hashPassword(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  try {
    const newUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        password: payload.password,
      },
    });

    const { password, ...restRestponse } = newUser;

    return restRestponse;
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

// Get User Prifile
const getProfile = async (token: string): Promise<IRegisterUserResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userEmail } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  return {
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };
};

// Get Users
const getUsers = async () => {
  const user = await prisma.user.findMany({});
  if (!user.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No user found!");
  }

  const result = exclude(user, ["password"]);

  return result;
};

export const UserService = {
  registerUser,
  getUsers,
  getProfile,
};
