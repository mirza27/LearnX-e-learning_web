const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const TaskUpload = require("./taskUploadModel.js");
const Student_classes = require("./student_classesModel.js");

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

// export default Student;
module.exports = Student;
