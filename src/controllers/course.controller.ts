import { Request, Response } from "express";

import { BadRequestError, NotFoundError, NotAuthorizedError } from "../errors";
import { CourseRepository } from "../database/repositories";

const courseRepository = new CourseRepository();

const addCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseName } = req.body;
    // const { userId } = req.user!;

    const courseExist = await courseRepository.findCourseByCourseName(
        courseName
    );
    if (courseExist) throw new BadRequestError("Course already exist");

    // We can also store userId in the table to recognize who created the course
    const newCourse = await courseRepository.createCourse(req.body);
    res.status(201).json({ course: newCourse.dataValues });
};

const getCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const course = await courseRepository.findByCourseId(parseInt(courseId));
    if (!course) throw new BadRequestError("Invalid courseId");
    res.status(200).json({ course });
};

const searchCourse = async (req: Request, res: Response): Promise<void> => {
    const { searchKey } = req.params;
    const courses = await courseRepository.search(searchKey);
    res.status(200).json({ courses });
};

const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    // const { userId } = req.user!;
    const course = await courseRepository.findByCourseId(parseInt(courseId));
    if (!course)
        throw new NotFoundError("There is no course with this courseId");
    // if (course.userId !== userId)
    //     throw new NotAuthorizedError("You cannot edit course added by others");

    const updated = await courseRepository.updateCourse(
        parseInt(courseId),
        // userId,
        req.body
    );
    res.status(200).json({ message: "Course updated successfully" });
};

const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    // const { userId } = req.user!;
    const deleteCourse = await courseRepository.deleteCourse(
        // userId,
        parseInt(courseId)
    );
    
    if (!deleteCourse) throw new BadRequestError("Invalid courseId");
    console.log("deleteCourse", deleteCourse);
    res.status(200).json({ deleteCourse });
};

export default { addCourse, getCourse, searchCourse, updateCourse, deleteCourse };
