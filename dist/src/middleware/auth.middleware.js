import { verifyToken } from "../utils/jwt.js";
import { sendErrorResponse } from "../utils/responseHandler.js";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendErrorResponse(res, [" No token provided"], "Access denied.", 401);
    }
    const token = authHeader.split(" ")[1];
    const verificationResult = verifyToken(token);
    if ("success" in verificationResult && !verificationResult.success) {
        return sendErrorResponse(res, ["Token expired. Please refresh your token."], verificationResult.message, verificationResult.statusCode);
    }
    req.user = verificationResult;
    next();
};
//# sourceMappingURL=auth.middleware.js.map