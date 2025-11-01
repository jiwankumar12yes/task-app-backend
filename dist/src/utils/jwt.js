// generating and verifying tokens
import jwt from "jsonwebtoken";
// generating token
const JWT_SECRET = process.env.JWT_SECRET;
const options = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "1h"),
};
const refreshOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ||
        "5d"),
};
if (!JWT_SECRET) {
    console.error("FATAL: JWT_SECRET is not defined. Shutting down.");
    process.exit(1);
}
// generate token
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, options);
};
// generate refresh token
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, refreshOptions);
};
// export const verifyRefreshToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as Payload;
//     return decoded;
//   } catch (error: any) {
//     const errorResponse: ApiErrorResponse = {
//       success: false,
//       message: "",
//       statusCode: 401,
//       error: error.message,
//       timestamp: new Date().toISOString(),
//     };
//     return errorResponse;
//   }
// };
// verifying tokens
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        let message = "Invalid token";
        let statusCode = 401;
        if (error.name == "TokenExpiredError") {
            message = "Token expired. Please refresh your token.";
        }
        else if (error.name === "JsonWebTokenError") {
            message = "Malformed or invalid token.";
        }
        else if (error.name === "NotBeforeError") {
            message = "Token not active yet.";
        }
        const errorResponse = {
            success: false,
            message: message,
            statusCode: statusCode,
            error: error.message,
            timestamp: new Date().toISOString(),
        };
        return errorResponse;
    }
};
// //
// // Testing
// //
// const test = async () => {
//   console.log("🧪 JWT Test Started...");
//   // Fake payload similar to your user
//   const fakeUser = {
//     id: 1,
//     email: "test@example.com",
//     name: "Test User",
//   };
//   const token = generateToken(fakeUser);
//   console.log("✅ Generated Token:\n", token);
//   // Verify token
//   const result = verifyToken(token);
//   console.log("\n🔍 Verified Result:\n", result);
// };
// test();
//# sourceMappingURL=jwt.js.map