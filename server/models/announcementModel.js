import { Sequelize } from "sequelize";
import db from "../db/db.js";
import Event from "./eventModel.js";

const { DataTypes } = Sequelize;

const Announcement = db.define(
  "announcements",
  {
    announcement_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Event.hasMany(Announcement, {
  foreignKey: "event_id",
  sourceKey: "event_id",
});
export default Announcement;
