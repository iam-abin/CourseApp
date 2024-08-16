import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.connection';
import { CourseModel } from './course';

// // Interface for Lesson attributes
// interface LessonAttributes {
//   id: number;
//   title: string;
//   content: string;
//   courseId: number;
// }

// // Optional fields for Lesson creation
// interface LessonCreationAttributes extends Optional<LessonAttributes, 'id'> {}

// Lesson model class
export class LessonModel extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public courseId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Lesson model
LessonModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'lessons',
  }
);

// The association is already defined in the Course model, but we can define it here too
// LessonModel.belongsTo(CourseModel);
// LessonModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

