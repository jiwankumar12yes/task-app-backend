import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  updateStatusController,
  updateTaskController,
} from "./task.controller.js";
import {
  createTaskSchema,
  TaskParamsSchema,
  updateTaskBodySchema,
  updateTaskStatusSchema,
} from "./task.schema.js";

const router = express.Router();

router.get("/all", authenticate, getAllTaskController);

router.post(
  "/create",
  authenticate,
  validate(createTaskSchema),
  createTaskController
);

router.put(
  "/:id",
  authenticate,
  validate(updateTaskBodySchema),
  updateTaskController
);

router.delete(
  "/:id",
  authenticate,
  validate(TaskParamsSchema),
  deleteTaskController
);

router.put(
  "/status/:id",
  authenticate,
  validate(updateTaskStatusSchema),
  updateStatusController
);

export default router;
