import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";

const User = sequelize.define("user", {
    first_name: { type: DataTypes.STRING(150), allowNull: false },
    last_name: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(150), allowNull: false },
    role: { type: DataTypes.ENUM("manager", "admin", "member"), defaultValue: "member" },
}, { freezeTableName: true, updatedAt: false, createdAt: "created_at" });

export default User;