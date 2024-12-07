import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";
import User from "../user/user.model.js";

const Project = sequelize.define("project", {
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: DataTypes.TEXT,
}, { freezeTableName: true, updatedAt: false, createdAt: "created_at" });

User.hasOne(Project, {
    foreignKey: {
        name: "created_by",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

export default Project;