import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";

const Role = sequelize.define("role", {
    name: { type: DataTypes.STRING(150), allowNull: false },
}, { freezeTableName: true, updatedAt: false, createdAt: false });

export default Role;