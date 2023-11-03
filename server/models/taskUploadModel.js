import { Sequelize } from "sequelize";
import db from "../db/db.js";
import Task from "./taskModel.js";

const { DataTypes } = Sequelize;

const TaskUpload = db.define(
  "task_upload",
  {
    task_upload_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    student_id: {
      type: DataTypes.STRING,
    },
    link: {
      // text
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file: {
      // byte blob
      type: DataTypes.BLOB,
      allowNull: true,
    },
    coment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Task.hasMany(TaskUpload, {
  foreignKey: "task_id",
  sourceKey: "task_id",
});

export default TaskUpload;
