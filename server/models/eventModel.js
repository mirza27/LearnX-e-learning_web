import { Sequelize } from "sequelize";
import db from "../db/db.js";
import Class from "./classModel.js";
import EventCategories from "./eventCategoryModel.js";

const { DataTypes } = Sequelize;

const Event = db.define(
  "events",
  {
    event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_category_id: {
      type: DataTypes.INTEGER,
    },
    event_name: {
      type: DataTypes.STRING,
    },
    class_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Class.belongsTo(Event, {
  foreignKey: "event_id",
  targetKey: "event_id",
});

Event.belongsTo(EventCategories, {
  foreignKey: "event_category_id", // This should match the foreign key in EventCategories
  targetKey: "category_id", // This should match the primary key in EventCategories
});

export default Event;
