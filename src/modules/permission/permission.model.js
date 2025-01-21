import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";

const Permission = sequelize.define("permission", {
    name: { type: DataTypes.STRING(150), allowNull: false },
}, { freezeTableName: true, updatedAt: false, createdAt: false });

export default Permission;