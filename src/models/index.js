import { Sequelize } from "sequelize";
import initModels from "./init-models.js";
import { config } from "../configs/config.js";

const sequelizeDbInit = new Sequelize(
    config.dbname,
    config.username,
    config.password, 
    { 
        dialect: 'mysql', 
        host: config.host, 
        port: config.port
    }
);

console.log(
    { 
        dbname: config.dbname,
        username: config.username,
        password: config.password, 
        option: { 
            dialect: 'mysql', 
            host: config.dbhost,
            port: config.dbport
        }
    }
)

const model = initModels(sequelizeDbInit)

export {
    model,
    sequelizeDbInit
}