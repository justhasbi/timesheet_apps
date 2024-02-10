import { Sequelize } from "sequelize";
import { config } from "../configs/config.js";
import initModels from "./init-models.js";

const sequelizeDbInit = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  dialect: "mysql",
  host: config.HOST,
  port: config.port,
});

console.log({
  dbname: config.DB,
  username: config.USER,
  password: config.PASSWORD,
  option: {
    dialect: "mysql",
    host: config.HOST,
    port: config.port,
  },
});

const model = initModels(sequelizeDbInit);

export { model, sequelizeDbInit };
