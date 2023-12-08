import { Sequelize } from "sequelize";
import db from "../db/db.js";

const { DataTypes } = Sequelize;

const Chat = db.define(
  "chats",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
    },
    sender_id: {
      type: DataTypes.STRING,
    },
    sender: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Chat;
