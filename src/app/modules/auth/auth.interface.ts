import { UserRoles } from "@prisma/client";
import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  user: {
    name: string;
    email: string;
    role: UserRoles;
  };
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  email: string;
  role: ENUM_USER_ROLE;
};
