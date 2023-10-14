import { Sequelize } from "sequelize";
import db from "../db/db.js";

const { DataTypes } = Sequelize;

const Lecturer = db.define(
  "lecturers",
  {
    lecturer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

export default Lecturer;
