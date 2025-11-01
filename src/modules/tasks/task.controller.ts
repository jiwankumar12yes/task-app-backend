import { Request, Response } from "express";
import { callError, TASK_CONST } from "../../constants/tasksConstants.js";
import {
  sendErrorResponse,
  sendResponse,
} from "../../utils/responseHandler.js";
import {
  CreateTaskInput,
  TaskParamsInput,
  updateTaskBodyInput,
  UpdateTaskStatusInput,
} from "./task.schema.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  UpdateStatus,
  updateTask,
} from "./task.service.js";

const { NOT_MATCH, TASK_CREATED, USER_NOT_FOUND, NOT_FOUND, SERVER_ERROR } =
  TASK_CONST.MESSAGE;

export const getAllTaskController = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return sendErrorResponse(
      res,
      ["Forbidden", "User not found Or expired token"],
      "Getting Tasks failed",
      403
    );
  }
  try {
    const allTasks = await getAllTasks(userId);
    sendResponse(res, allTasks, "All tasks fetched ", 200);
  } catch (error: any) {
    if (error.message.includes(USER_NOT_FOUND)) {
      sendErrorResponse(res, ["null"], error.message, 404);
    } else {
      sendErrorResponse(res, ["null"], SERVER_ERROR, 500);
    }
  }
};

export const createTaskController = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId) {
    return sendErrorResponse(
      res,
      ["Forbidden", "User not found Or expired token"],
      "Task creation failed",
      403
    );
  }
  try {
    const task = await createTask(userId, req.body);
    sendResponse(res, { task }, TASK_CREATED, 201);
  } catch (error: any) {
    if (error.message.includes(USER_NOT_FOUND)) {
      sendErrorResponse(res, ["null"], error.message, 404);
    } else {
      sendErrorResponse(res, ["null"], SERVER_ERROR, 500);
    }
  }
};

export const updateTaskController = async (
  req: Request<TaskParamsInput, {}, updateTaskBodyInput>,
  res: Response
) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user?.id;
  if (!userId) {
    return sendErrorResponse(
      res,
      ["Forbidden", "User not found Or expired token"],
      "Task creation failed",
      403
    );
  }
  try {
    const task = await updateTask(userId, taskId, req.body);
    sendResponse(res, task, "Task Updated", 200);
  } catch (error: any) {
    callError(error, res);
  }
};

export const deleteTaskController = async (
  req: Request<TaskParamsInput, {}, {}>,
  res: Response
) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user?.id;
  if (!userId) {
    return sendErrorResponse(
      res,
      ["Forbidden", "User not found Or expired token"],
      "Task creation failed",
      403
    );
  }
  try {
    const deletedTask = await deleteTask(userId, taskId);
    sendResponse(res, deletedTask, "Task deleted Successfully", 200);
  } catch (error: any) {
    callError(error, res);
  }
};

export const updateStatusController = async (
  req: Request<TaskParamsInput, {}, UpdateTaskStatusInput>,
  res: Response
) => {
  const taskId = parseInt(req.params.id);
  const userid = req.user?.id;
  if (!userid) {
    return sendErrorResponse(
      res,
      ["User not found or expired token"],
      "Task status updation failed",
      400
    );
  }
  try {
    const updatedStatusTask = await UpdateStatus(
      userid,
      taskId,
      req.body.status
    );
    sendResponse(res, updatedStatusTask, "Task status updated", 200);
  } catch (error: any) {
    callError(error, res);
  }
};
