import { Sequelize } from "sequelize";
import db from "../db/db.js";
import Event from "./eventModel.js";

const { DataTypes } = Sequelize;

const EventCategories = db.define(
  "event_categories",
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Event.hasMany(EventCategories, {
//   foreignKey: "category_id",
//   sourceKey: "category_id",
// });

export default EventCategories;
