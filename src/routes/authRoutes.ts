import express, { Router } from "express";
import authController from "../controllers/auth.controller";
const router: Router = express.Router()

// /api/v1/auth
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

export default router

