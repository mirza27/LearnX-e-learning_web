const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db.js");
const Event = require("./eventModel.js");

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

// export default EventCategories;
module.exports = EventCategories;
