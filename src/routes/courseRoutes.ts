import express, { Router } from "express";
import courseController from "../controllers/course.controller";
const router: Router = express.Router();

// /api/v1/course
router.post("/", courseController.addCourse);
router.get("/:courseId", courseController.getCourse);
router.patch("/:courseId", courseController.updateCourse);
router.delete("/:courseId", courseController.deleteCourse);

export default router;