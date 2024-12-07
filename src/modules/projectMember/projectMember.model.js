import { DataTypes } from "@sequelize/core";
import sequelize from "../../common/configs/sequelize.config.js";
import User from "../user/user.model.js";
import Project from "../project/project.model.js";

const ProjectMember = sequelize.define("projectMember", {
    added_at: { type: DataTypes.DATE, defaultValue: Date.now },
}, { freezeTableName: true, updatedAt: "updated_at", createdAt: "created_at" });

Project.hasOne(ProjectMember, {
    foreignKey: {
        name: "project_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
});

User.hasOne(ProjectMember, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
});

export default ProjectMember;