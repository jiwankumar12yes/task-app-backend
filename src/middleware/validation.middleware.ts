import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import { sendErrorResponse } from "../utils/responseHandler.js";

// zod error format
const formatZodErrors = (issues: ZodError["issues"]): string[] => {
  return issues.map((issue) => {
    const path =
      issue.path.length > 1 ? issue.path.slice(1).join(".") : "Request";
    return `${path}:${issue.message}`;
  });
};

export const validate = (Schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const userFriendlyErrors = formatZodErrors(error.issues);

        sendErrorResponse(res, userFriendlyErrors, "validation failed", 400);
      } else {
        sendErrorResponse(res, error, "validation failed", 500);
      }
    }
  };
};
