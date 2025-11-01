import { z } from "zod";
const TaskStatus = z.enum(["Pending", "In_Process", "Completed"]);
export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long."),
        description: z.string().optional(),
        status: TaskStatus.default("Pending"),
        dueDate: z.iso.datetime(),
    }),
});
export const TaskParamsSchema = z.object({
    params: z.object({
        id: z.string().refine((val) => !isNaN(parseInt(val)), {
            message: "Task ID must be a valid number.",
        }),
    }),
});
export const updateTaskBodySchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long.")
        .optional(),
    description: z.string().optional(),
    status: TaskStatus.optional(),
    dueDate: z.iso.datetime().optional(),
});
export const updateTaskStatusSchema = z.object({
    body: z.object({
        status: TaskStatus,
    }),
});
export const updateTaskSchema = z.object({
    params: TaskParamsSchema,
    body: updateTaskBodySchema,
});
//# sourceMappingURL=task.schema.js.map