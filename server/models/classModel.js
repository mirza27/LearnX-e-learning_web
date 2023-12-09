const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Lecturer = require("./lecturerModel.js");

const Classes = db.define(
  "clases",
  {
    class_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_name: {
      type: DataTypes.STRING,
    },
    lecturer_id: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ENUM(
        "programming",
        "math",
        "science",
        "history",
        "tech",
        "religion",
        "social",
        "art",
        "health",
        "business"
      ),
    },
    desc: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Classes.belongsTo(Lecturer, {
  foreignKey: "lecturer_id",
  targetKey: "lecturer_id",
});

// export default Classes;
module.exports = Classes;
