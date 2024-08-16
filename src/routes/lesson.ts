import express, { Router } from "express";
import lessonController from "../controllers/lesson.controller";
import { auth } from "../middlewares";
import {
    createLessonRequestBodyValidator,
    updateLessonRequestBodyValidator,
} from "../utils/validation/lesson.validation";

const router: Router = express.Router();

router.use(auth);
// /api/v1/lesson
// router.get("/", lessonController.getAllCourses);
router.get("/:lessonId", lessonController.getLesson);
// router.get("/search/:searchKey", lessonController.searchCourse);
router.post("/", createLessonRequestBodyValidator, lessonController.addLesson);
router.patch(
    "/:lessonId",
    updateLessonRequestBodyValidator,
    lessonController.updateLesson
);
router.delete("/:lessonId", lessonController.deleteLesson);

export default router;
