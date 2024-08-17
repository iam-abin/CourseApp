import { Model, Op } from "sequelize";

import { CourseModel, LessonModel } from "../models";
import {
    addDataToRedis,
    getDataFromRedis,
    removeDataFromRedis,
} from "../../utils/redis";
import { REDIS_COURSES_KEY } from "../../utils/constants";

export class CourseRepository {
    async createCourse(courseData: Partial<CourseModel>): Promise<CourseModel> {
        const newCourse = await CourseModel.create(courseData);
        await removeDataFromRedis(REDIS_COURSES_KEY);
        return newCourse;
    }

    async findByCourseId(courseId: number): Promise<CourseModel | null> {
        const cachedCourse = await getDataFromRedis(
            REDIS_COURSES_KEY,
            courseId.toString()
        );

        if (cachedCourse) {
            console.log("====>>>THIS IS CACHED COURSE DATA");
            return JSON.parse(cachedCourse);
        }

        // If not cached, retrieve the course and its associated lessons from the database
        const course = await CourseModel.findByPk(courseId,{
            include:[{
                model: LessonModel,
                as: 'lessons'
            }]
        });
        await addDataToRedis(
            REDIS_COURSES_KEY,
            courseId.toString(),
            JSON.stringify(course)
        );
        return course;
    }

    async findCourseByCourseName(
        courseName: string
    ): Promise<CourseModel | null> {
        const cachedCourse = await getDataFromRedis(
            REDIS_COURSES_KEY,
            courseName
        );
        if (cachedCourse) {
            console.log("====>>>THIS IS CACHED COURSE DATA");
            return JSON.parse(cachedCourse);
        }

        const course = await CourseModel.findOne({
            where: { courseName },
        });
        if(course) await addDataToRedis(
            REDIS_COURSES_KEY,
            courseName,
            JSON.stringify(course)
        );
        return course;
    }

    async search(searchKey: string): Promise<CourseModel[]> {
        const cachedCourses = await getDataFromRedis(
            REDIS_COURSES_KEY,
            searchKey
        );

        if (cachedCourses) {
            console.log(
                "====>>>THIS IS CACHED SEARCH COURSE DATA"
            );
            return JSON.parse(cachedCourses);
        }

        const courses = await CourseModel.findAll({
            where: {
                courseName: {
                    [Op.iLike]: `%${searchKey}%`,
                },
            },
            limit: 3,
        });

        await addDataToRedis(
            REDIS_COURSES_KEY,
            searchKey,
            JSON.stringify(courses)
        );
        return courses;
    }

    async updateCourse(courseId: number, courseData: Partial<CourseModel>): Promise<number | null> {
        const [affectedRows] = await CourseModel.update(
            { ...courseData },
            {
                where: { id: courseId },
            }
        );
        // Check if any rows were affected
        if (affectedRows === 0) {
            return null;
        }
        await removeDataFromRedis(REDIS_COURSES_KEY);

        return affectedRows;
    }

    async deleteCourse(courseId: number): Promise<number> {
        // We can do softdelete if needed
        const course = await CourseModel.destroy({ where: { id: courseId } });
        if (course)
            await removeDataFromRedis(REDIS_COURSES_KEY)
        return course;
    }
}
