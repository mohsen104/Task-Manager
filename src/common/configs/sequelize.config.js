import Sequelize from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import logger from "./logger.js";

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    host: "localhost",
    database: "task_manager",
    user: "root",
    password: "",
    port: 3306,
})

sequelize.authenticate()
    .then(async () => {
        await sequelize.sync({ alter: true });
        console.log("connected to mysql");
    })
    .catch((error) => {
        logger.error(error);
    })

export default sequelize;