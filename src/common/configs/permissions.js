import Permission from "../../modules/permission/permission.model.js";
import Role from "../../modules/role/role.model.js";
import RolePermission from "../../modules/rolePermission/rolePermission.model.js";

async function CreatePermissions() {
    await Role.sync({ alter: true });
    await Permission.sync({ alter: true });
    await RolePermission.sync({ alter: true });

    await Role.bulkCreate([{ name: "manager" }, { name: "admin" }, { name: "member" }]);

    await Permission.bulkCreate([
        { name: "getAllUsers" },
        { name: "getTasksOfUser" },
        { name: "getTaskDetail" },
        { name: "createTask" },
        { name: "updateTask" },
        { name: "deleteTask" },
        { name: "getAllProject" },
        { name: "createProject" },
        { name: "updateProject" },
        { name: "deleteProject" },
        { name: "addMemberToProject" },
        { name: "getUsersOfProject" },
        { name: "getTasksOfUserInProject" },
    ]);

    await RolePermission.bulkCreate([
        { role_id: 1, permission_id: 1 },
        { role_id: 1, permission_id: 2 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        { role_id: 1, permission_id: 6 },
        { role_id: 1, permission_id: 7 },
        { role_id: 1, permission_id: 8 },
        { role_id: 1, permission_id: 9 },
        { role_id: 1, permission_id: 10 },
        { role_id: 1, permission_id: 11 },
        { role_id: 1, permission_id: 12 },
        { role_id: 1, permission_id: 13 },
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 3 },
        { role_id: 2, permission_id: 4 },
        { role_id: 2, permission_id: 5 },
        { role_id: 2, permission_id: 8 },
        { role_id: 2, permission_id: 9 },
        { role_id: 2, permission_id: 11 },
        { role_id: 2, permission_id: 12 },
        { role_id: 3, permission_id: 13 },
        { role_id: 3, permission_id: 2 },
        { role_id: 3, permission_id: 3 },
        { role_id: 3, permission_id: 5 },
        { role_id: 3, permission_id: 12 },
        { role_id: 3, permission_id: 13 }
    ]);
}

export default CreatePermissions;