import { LessonModel } from "../models";
import {
    addDataToRedis,
    getDataFromRedis,
    removeDataFromRedis,
} from "../../utils/redis";
import { REDIS_COURSES_KEY, REDIS_LESSON_KEY } from "../../utils/constants";

export class LessonRepository {
    async createLesson(lessonData: Partial<LessonModel>): Promise<LessonModel> {
        const newLesson = await LessonModel.create(lessonData);
        await removeDataFromRedis(REDIS_LESSON_KEY);
        await removeDataFromRedis(REDIS_COURSES_KEY);
        return newLesson;
    }

    async findById(lessonId: number): Promise<LessonModel | null> {
        const cachedLesson = await getDataFromRedis(
            REDIS_LESSON_KEY,
            lessonId.toString()
        );

        if (cachedLesson) {
            console.log("========>>>>THIS IS CACHED LESSON DATA");
            return JSON.parse(cachedLesson);
        }

        const lesson = await LessonModel.findByPk(lessonId);
        if (lesson) {
            await addDataToRedis(
                REDIS_LESSON_KEY,
                lessonId.toString(),
                JSON.stringify(lesson)
            );
        }
        return lesson;
    }

    async findLessonBytitle(title: string): Promise<LessonModel | null> {
        const cachedLesson = await getDataFromRedis(REDIS_LESSON_KEY, title);
        if (cachedLesson) {
            console.log("========>>>>THIS IS CACHED LESSON DATA");
            return JSON.parse(cachedLesson);
        }

        const lesson = await LessonModel.findOne({
            where: { title },
        });
        if(lesson) await addDataToRedis(REDIS_LESSON_KEY, title, JSON.stringify(lesson));
       
        return lesson;
    }

    async updateLesson(
        lessonId: number,
        lessonData: Partial<LessonModel>
    ): Promise<number | null> {
        const [affectedRows] = await LessonModel.update(
            { ...lessonData },
            {
                where: { id: lessonId },
            }
        );
        // Check if any rows were affected
        if (affectedRows === 0) {
            return null;
        }
        await removeDataFromRedis(REDIS_LESSON_KEY);
        await removeDataFromRedis(REDIS_COURSES_KEY);

        return affectedRows;
    }

    async deleteLesson(lessonId: number): Promise<number> {
        // We can do softdelete if needed
        const deleted = await LessonModel.destroy({ where: { id: lessonId } });
        if (deleted){
            await removeDataFromRedis(REDIS_LESSON_KEY);
            await removeDataFromRedis(REDIS_COURSES_KEY);
        } 


        return deleted;
    }
}
