import sequelize from "../../common/configs/sequelize.config.js";
import Role from '../role/role.model.js';
import Permission from '../permission/permission.model.js';

const RolePermission = sequelize.define("rolePermission",{},
{ freezeTableName: true, updatedAt: false, createdAt: false });

Role.hasOne(RolePermission, {
    foreignKey: {
        name: "role_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

Permission.hasOne(RolePermission, {
    foreignKey: {
        name: "permission_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
})

export default RolePermission;