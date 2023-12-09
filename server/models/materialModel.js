const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Event = require("./eventModel.js");

const Material = db.define(
  "materials",
  {
    material_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    material_name: {
      type: DataTypes.STRING,
    },
    event_id: {
      type: DataTypes.INTEGER,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Event.hasMany(Material, {
  foreignKey: "event_id",
  sourceKey: "event_id",
});

// export default Material;
module.exports = Material;
