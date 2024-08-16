import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import {
    signinRequestBodyValidator,
    signupRequestBodyValidator,
} from "../utils/validation/user.validation";

const router: Router = express.Router();

// /api/v1/auth
router.post("/signin", signinRequestBodyValidator, authController.signin);
router.post("/signup", signupRequestBodyValidator, authController.signup);

export default router;
