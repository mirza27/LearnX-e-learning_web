const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Event = require("./eventModel.js");

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

module.exports = Announcement;
