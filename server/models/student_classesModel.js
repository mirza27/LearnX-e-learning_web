const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Classes = require("./classModel.js");

const Student_classes = db.define(
  "student_clases",
  {
    student_class_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
    },
    student_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Student_classes.hasMany(Classes, {
  foreignKey: "class_id",
  sourceKey: "class_id",
});

// export default Student_classes;
module.exports = Student_classes;
