import { UserRoles } from "@prisma/client";

export type IRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  businessName: string | null;
};

export type IRegisterUserResponse = {
  name: string;
  email: string;
  role: UserRoles;
};

export type IUser = {
  name: string;
  email: string;
  role: string;
};
