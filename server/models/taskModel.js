const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Event = require("./eventModel.js");

const Task = db.define(
  "task",
  {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
    },
    task_name: {
      type: DataTypes.STRING,
    },
    task_desc: {
      // text
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file: {
      // byte blob
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Event.hasMany(Task, {
  foreignKey: "event_id",
  sourceKey: "event_id",
});

// export default Task;
module.exports = Task;
