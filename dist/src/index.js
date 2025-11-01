import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import taskRoute from "./modules/tasks/task.route.js";
import { sendResponse } from "./utils/responseHandler.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 3000;
// default route
app.get("/", (req, res) => {
    sendResponse(res, { status: "online", name: "task manager backend" }, "Api is running", 200);
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRoute);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
//# sourceMappingURL=index.js.map