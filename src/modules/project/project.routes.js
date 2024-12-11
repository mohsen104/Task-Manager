import { Router } from "express";
import ProjectController from "./project.controller.js";
import ProjectMemberController from "../projectMember/projectMember.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";

const router = Router();

router.get("/", AuthorizationGuard, ProjectController.getAllProject);
router.post("/", AuthorizationGuard, ProjectController.createProject)
router.put("/:project_id", AuthorizationGuard, ProjectController.updateProject);
router.delete("/:project_id", AuthorizationGuard, ProjectController.deleteProject);
router.post("/:project_id/members", ProjectMemberController.addMemberToProject);
router.get("/:project_id/users", AuthorizationGuard, ProjectController.getUsersOfProject);
router.get("/:project_id/users/:user_id/tasks", AuthorizationGuard, ProjectController.getTasksOfUserInProject);

export default router;