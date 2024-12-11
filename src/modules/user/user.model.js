import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";
import Role from "../role/role.model.js";

const User = sequelize.define("user", {
    first_name: { type: DataTypes.STRING(150), allowNull: false },
    last_name: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(150), allowNull: false },
    verify: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { freezeTableName: true, updatedAt: false, createdAt: "created_at" });

Role.hasOne(User, {
    foreignKey: {
        name: "role_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

export default User;