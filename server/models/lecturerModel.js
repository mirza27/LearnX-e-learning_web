const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");

const Lecturer = db.define(
  "lecturers",
  {
    lecturer_id: {
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

// export default Lecturer;
module.exports = Lecturer;
