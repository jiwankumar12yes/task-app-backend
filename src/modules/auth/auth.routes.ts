import express from "express";
import { validate } from "../../middleware/validation.middleware.js";
import { loginController, registerController } from "./auth.controller.js";
import { LoginUserSchema, RegisterUserSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(RegisterUserSchema), registerController);
router.post("/login", validate(LoginUserSchema), loginController);

export default router;
