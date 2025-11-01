import { z } from "zod";
export const RegisterUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, "name should be more than 2 characters."),
        email: z.email("Invalid email format"),
        password: z.string().min(4, "Password must be at least 4 characters long."),
    }),
});
export const LoginUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email format"),
        password: z.string().min(4, "Password must be at least 4 characters long."),
    }),
});
//# sourceMappingURL=auth.schema.js.map