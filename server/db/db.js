import { Sequelize } from "sequelize";

const db = new Sequelize("learnx", "root", "12Dwiana!", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
