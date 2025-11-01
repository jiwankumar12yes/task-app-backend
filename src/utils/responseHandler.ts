import { Response } from "express";
import { ApiErrorResponse, ApiResponse } from "../types/response.js";

export const sendResponse = <T>(
  res: Response,
  data: T,
  message: string,
  statusCode: number = 200
): void => {
  const responseBody: ApiResponse<T> = {
    success: true,
    message: message,
    data: data,
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(responseBody);
};

export const sendErrorResponse = (
  res: Response,
  error: string[],
  message: string,
  statusCode: number = 400
): void => {
  const errorResponseBody: ApiErrorResponse = {
    success: false,
    message: message,
    statusCode: statusCode,
    error: error,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(errorResponseBody);
};
