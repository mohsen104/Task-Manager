import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";
import User from "../user/user.model.js";
import Project from "../project/project.model.js";

const Task = sequelize.define("task", {
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: DataTypes.TEXT,
    status: { type: DataTypes.ENUM("todo", "doing", "done"), defaultValue: "todo" },
    priority: { type: DataTypes.ENUM("low", "medium", "high"), defaultValue: "low" },
    due_date: DataTypes.DATE,
}, { freezeTableName: true, updatedAt: false, createdAt: "created_at" });

User.hasOne(Task, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

Project.hasOne(Task, {
    foreignKey: {
        name: "project_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

export default Task;