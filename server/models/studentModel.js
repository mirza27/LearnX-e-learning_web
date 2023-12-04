import { Sequelize } from "sequelize";
import db from "../db/db.js";
import TaskUpload from "./taskUploadModel.js";
import Student_classes from "./student_classesModel.js";
const { DataTypes } = Sequelize;

const Student = db.define(
  "students",
  {
    student_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Student.belongsTo(TaskUpload, {
  foreignKey: "student_id",
  targetKey: "student_id",
});

Student.belongsTo(Student_classes, {
  foreignKey: "student_id",
  targetKey: "student_id",
});

export default Student;
