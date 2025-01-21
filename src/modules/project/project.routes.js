import { Router } from "express";
import ProjectController from "./project.controller.js";
import ProjectMemberController from "../projectMember/projectMember.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";
import AuthorizeGuard from "../../common/guards/Authorize.guard.js";

const router = Router();

router.get("/", AuthorizationGuard, AuthorizeGuard('getAllProject'), ProjectController.getAllProject);
router.post("/", AuthorizationGuard, AuthorizeGuard('createProject'), ProjectController.createProject)
router.put("/:project_id", AuthorizationGuard, AuthorizeGuard('updateProject'), ProjectController.updateProject);
router.delete("/:project_id", AuthorizationGuard, AuthorizeGuard('deleteProject'), ProjectController.deleteProject);
router.post("/:project_id/members", AuthorizationGuard, AuthorizeGuard('addMemberToProject'), ProjectMemberController.addMemberToProject);
router.get("/:project_id/users", AuthorizationGuard, AuthorizeGuard('getUsersOfProject'), ProjectController.getUsersOfProject);
router.get("/:project_id/users/:user_id/tasks", AuthorizationGuard, AuthorizeGuard('getTasksOfUserInProject'), ProjectController.getTasksOfUserInProject);

export default router;