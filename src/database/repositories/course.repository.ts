import { CourseModel } from "../models";

export class CourseRepository{

    async createCourse( courseData: Partial<CourseModel> ): Promise<CourseModel> {
        const newCourse = await CourseModel.create(courseData);
		return newCourse;
    }

    async findById(courseId: number) {
        const course = await CourseModel.findByPk(courseId);
        return course;
    }

    async findCourseByCourseName(courseName: string) {
        const course = await CourseModel.findOne({
            where: { courseName },
        });
        return course;
    }


    async updateCourse(courseId: number, courseData: Partial<CourseModel> ) {
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

    async deleteCourse(courseId: number, ){
        const course = await CourseModel.destroy({where:{id: courseId}});
        return course
    }

}