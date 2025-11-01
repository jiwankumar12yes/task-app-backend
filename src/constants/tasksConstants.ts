import { Response } from "express";
import { sendErrorResponse } from "../utils/responseHandler.js";
export const TASK_CONST = {
  MESSAGE: {
    NOT_FOUND: "Task not Found",
    NOT_MATCH: "Task does not belong to this user",
    SERVER_ERROR: "Internal server issue",
    USER_NOT_FOUND: "user not exist to create task",
    TASK_CREATED: "Task created successfully.",
  },
} as const;

export function callError(error: any, res: Response) {
  const { NOT_MATCH, NOT_FOUND, SERVER_ERROR } = TASK_CONST.MESSAGE;
  if (error.message.includes(NOT_FOUND)) {
    sendErrorResponse(res, ["null"], error.message, 404);
  } else if (error.message.includes(NOT_MATCH)) {
    sendErrorResponse(res, ["null"], error.message, 404);
  } else {
    sendErrorResponse(res, ["null"], SERVER_ERROR, 500);
  }
}
