const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Task = require("./taskModel.js");

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_late: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
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

// export default TaskUpload;
module.exports = TaskUpload;
