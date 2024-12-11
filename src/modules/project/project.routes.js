import { Router } from "express";
import ProjectController from "./project.controller.js";
import ProjectMemberController from "../projectMember/projectMember.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";

const router = Router();

router.get("/", AuthorizationGuard, AuthorizeGuard('read'), ProjectController.getAllProject);
router.post("/", AuthorizationGuard, AuthorizeGuard('create'), ProjectController.createProject)
router.put("/:project_id", AuthorizationGuard, AuthorizeGuard('update'), ProjectController.updateProject);
router.delete("/:project_id", AuthorizationGuard, AuthorizeGuard('delete'), ProjectController.deleteProject);
router.post("/:project_id/members", AuthorizationGuard, AuthorizeGuard('add'), ProjectMemberController.addMemberToProject);
router.get("/:project_id/users", AuthorizationGuard, AuthorizeGuard('read'), ProjectController.getUsersOfProject);
router.get("/:project_id/users/:user_id/tasks", AuthorizationGuard, AuthorizeGuard('read'), ProjectController.getTasksOfUserInProject);

export default router;