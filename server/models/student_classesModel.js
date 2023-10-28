import { Sequelize } from "sequelize";
import db from "../db/db.js";
import Classes from "./classModel.js";

const { DataTypes } = Sequelize;
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

export default Student_classes;
