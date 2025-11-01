import { ZodError } from "zod";
import { sendErrorResponse } from "../utils/responseHandler.js";
// zod error format
const formatZodErrors = (issues) => {
    return issues.map((issue) => {
        const path = issue.path.length > 1 ? issue.path.slice(1).join(".") : "Request";
        return `${path}:${issue.message}`;
    });
};
export const validate = (Schema) => {
    return (req, res, next) => {
        try {
            Schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const userFriendlyErrors = formatZodErrors(error.issues);
                sendErrorResponse(res, userFriendlyErrors, "validation failed", 400);
            }
            else {
                sendErrorResponse(res, error, "validation failed", 500);
            }
        }
    };
};
//# sourceMappingURL=validation.middleware.js.map