import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import { signinRequestBodyValidator } from "../utils/validation/user/signin.validation";
import { signupRequestBodyValidator } from "../utils/validation/user/signup.validation";
const router: Router = express.Router()

// /api/v1/auth
router.post('/signin', signinRequestBodyValidator, authController.signin);
router.post('/signup', signupRequestBodyValidator, authController.signup);

export default router

