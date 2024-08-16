import { CourseModel } from "../models";
import { Op } from "sequelize";

export class CourseRepository {
    async createCourse(courseData: Partial<CourseModel>): Promise<CourseModel> {
        const newCourse = await CourseModel.create(courseData);
        return newCourse;
    }

    async findById(courseId: number):Promise<CourseModel | null> {
        const course = await CourseModel.findByPk(courseId);
        return course;
    }

    async findCourseByCourseName(courseName: string):Promise<CourseModel|null> {
        const course = await CourseModel.findOne({
            where: { courseName },
        });
        return course;
    }

    async search(searchKey: string): Promise<CourseModel[]> {
        const courses = await CourseModel.findAll({
            where: {
                courseName: {
                    [Op.iLike]: `%${searchKey}%`,
                },
            },
            limit: 3
        });
        return courses;
    }

    async updateCourse(courseId: number, courseData: Partial<CourseModel>) {
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
        return affectedRows;
    }

    async deleteCourse(courseId: number): Promise<number> {
        const course = await CourseModel.destroy({ where: { id: courseId } });
        return course;
    }
}
