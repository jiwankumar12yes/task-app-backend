import { prisma } from "../../config/db.js";
import { TASK_CONST } from "../../constants/tasksConstants.js";
import {
  CreateTaskInput,
  TaskStatusInput,
  updateTaskBodyInput,
} from "./task.schema.js";

const { NOT_FOUND, NOT_MATCH } = TASK_CONST.MESSAGE;

export const getAllTasks = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("user not exist to create task");
  }
  const tasks = await prisma.tasks.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      dueDate: true,
      createdAt: true,
    },
  });
  return tasks;
};

export const createTask = async (userId: number, data: CreateTaskInput) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("user not exist to create task");
  }
  const task = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      ownerId: userId,
    },
    select: {
      id: true,
      title: true,
      status: true,
      dueDate: true,
      createdAt: true,
    },
  });
  return task;
};

export const updateTask = async (
  userId: number,
  taskId: number,
  data: updateTaskBodyInput
) => {
  const task = await prisma.tasks.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new Error("Task not Found");
  }

  if (task.ownerId !== userId) {
    throw new Error("Task does not belong to this user");
  }
  const updatedTask = await prisma.tasks.update({
    where: {
      id: taskId,
      ownerId: userId,
    },
    data: {
      ...data,
    },
  });
  return updatedTask;
};

export const deleteTask = async (userId: number, taskId: number) => {
  const task = await prisma.tasks.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new Error("Task not Found");
  }

  if (task.ownerId !== userId) {
    throw new Error("Task does not belong to this user");
  }
  const deleteTask = await prisma.tasks.delete({
    where: {
      id: taskId,
      ownerId: userId,
    },
    select: {
      title: true,
    },
  });
  return deleteTask;
};

export const UpdateStatus = async (
  userId: number,
  taskId: number,
  status: TaskStatusInput
) => {
  const task = await prisma.tasks.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new Error(NOT_FOUND);
  }

  if (task.ownerId !== userId) {
    throw new Error(NOT_MATCH);
  }
  const updatedStatus = await prisma.tasks.update({
    where: {
      id: taskId,
      ownerId: userId,
    },
    data: {
      status: status,
    },
  });
  return updatedStatus;
};
