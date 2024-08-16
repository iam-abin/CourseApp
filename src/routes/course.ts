import express, { Router } from "express";
import courseController from "../controllers/course.controller";
import { createCourseRequestBodyValidator } from "../utils/validation/course/create.validation";
import { auth } from "../middlewares";
import { updateCourseRequestBodyValidator } from "../utils/validation/course/update.validation";
const router: Router = express.Router();

// /api/v1/course
// router.get("/", courseController.getAllCourses);
router.get("/:courseId", courseController.getCourse);
router.get("/search/:searchKey", courseController.searchCourse);

router.use(auth);
router.post("/", createCourseRequestBodyValidator, courseController.addCourse);
router.patch(
    "/:courseId",
    updateCourseRequestBodyValidator,
    courseController.updateCourse
);
router.delete("/:courseId", courseController.deleteCourse);

export default router;