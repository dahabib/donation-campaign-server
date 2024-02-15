import { z } from "zod";

const registerUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required !" }),
    email: z.string({ required_error: "Email is required !" }),
    password: z.string({ required_error: "Password is required !" }),
    role: z.string({ required_error: "User role is required !" }),
  }),
});

const getProfileTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required !" }),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
  getProfileTokenZodSchema,
};
