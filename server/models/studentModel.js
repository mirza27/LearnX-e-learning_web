import { Sequelize } from "sequelize";
import db from "../db/db.js";

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

export default Student;
