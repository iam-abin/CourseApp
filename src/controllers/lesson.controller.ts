import { Request, Response } from "express";

import { BadRequestError, NotAuthorizedError, NotFoundError } from "../errors";
import { CourseRepository, LessonRepository } from "../database/repositories";
import { LessonModel } from "../database/models";

const lessonRepository = new LessonRepository();
const courseRepository = new CourseRepository();

const addLesson = async (req: Request, res: Response) => {
    const { title, courseId } = req.body;
    // const {createdBy}
    const existCourse = await courseRepository.findByCourseId(courseId);
    if (!existCourse) throw new BadRequestError("The course does not exist");
    const lessonExist = await lessonRepository.findLessonBytitle(title);
    if (lessonExist) throw new BadRequestError("Lesson already exist");

    const lesson = await lessonRepository.createLesson(req.body);
    res.status(201).json({ lesson: lesson.dataValues });
};

const getLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const lesson = await lessonRepository.findById(parseInt(lessonId));
    if (!lesson) throw new BadRequestError("Invalid lessonId");
    res.status(200).json({ lesson });
};

// const searchLesson = async (req: Request, res: Response) => {
//     const { searchKey } = req.params;
//     const lessons = await lessonRepository.search(searchKey);
//     // console.log("lesson", lessons);
//     res.status(200).json({ lessons });
// };

const updateLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    // const { userId } = req.user!;
    const { courseId } = req.body as Partial<LessonModel>;
    const existCourse = await courseRepository.findByCourseId(courseId!);
    if (!existCourse) throw new BadRequestError("The course does not exist");
    const lesson = await lessonRepository.findById(parseInt(lessonId));
    if (!lesson)
        throw new NotFoundError("There is no lesson with this lessonId");

    // if (lesson.userId !== userId)
    //     throw new NotAuthorizedError("You cannot edit lesson added by others");

    const updated = await lessonRepository.updateLesson(
        parseInt(lessonId),
        // userId,
        req.body
    );
    // if(!updated) return  res.status(200).json({ message: "Lesson not updated" });
    res.status(200).json({ message: "Lesson updated successfully" });
};

const deleteLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    // const { userId } = req.user!;
    const deleteLesson = await lessonRepository.deleteLesson(
        // userId,
        parseInt(lessonId)
    );
    console.log(deleteLesson);

    if (!deleteLesson) throw new BadRequestError("Invalid lessonId");
    console.log("deleteLesson", deleteLesson);
    res.status(200).json({ deleteLesson });
};

export default { addLesson, getLesson, updateLesson, deleteLesson };
