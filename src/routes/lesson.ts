import express, { Router } from "express";
import lessonController from "../controllers/lesson.controller";
import { auth } from "../middlewares";
import {
    createLessonRequestBodyValidator,
    updateLessonRequestBodyValidator,
} from "../utils/validation/lesson.validation";

const router: Router = express.Router();

// /api/v1/lesson
router.get("/:lessonId", lessonController.getLesson);

router.use(auth);
router.post("/", createLessonRequestBodyValidator, lessonController.addLesson);
router.patch(
    "/:lessonId",
    updateLessonRequestBodyValidator,
    lessonController.updateLesson
);
router.delete("/:lessonId", lessonController.deleteLesson);

export default router;
