import { Request, Response } from "express";
import { env } from "../../config/index.js";
import {
  sendErrorResponse,
  sendResponse,
} from "../../utils/responseHandler.js";
import { LoginUserInput, RegisterUserInput } from "./auth.schema.js";
import { login, register } from "./auth.service.js";

export const registerController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const { user } = await register(req.body);
    sendResponse(res, { user }, "Registration successful.", 201);
  } catch (error: any) {
    if (error.message.includes("already registered")) {
      sendErrorResponse(
        res,
        error.message,
        "This email is already registered.",
        400
      );
    } else {
      sendErrorResponse(res, error, "Internal Server Error", 500);
    }
  }
};

export const loginController = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  try {
    const { user, accessToken, refreshToken } = await login(req.body);
    const maxAgeMs = Number(env.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    sendResponse(res, { user, accessToken }, "Login Successful", 200);
  } catch (error: any) {
    if (error.message.includes("user not found")) {
      sendErrorResponse(res, error, error.message, 400);
    } else if (error.message.includes("Password not matched")) {
      sendErrorResponse(res, error, error.message, 400);
    } else {
      sendErrorResponse(res, error, "Internal Server Error", 500);
    }
  }
};
