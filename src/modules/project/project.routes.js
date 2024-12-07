import { Router } from "express";
import ProjectController from "./project.controller.js";
import ProjectMemberController from "../projectMember/projectMember.controller.js";

const router = Router();

router.get("/", ProjectController.getAllProject);
router.post("/", ProjectController.createProject)
router.put("/:project_id", ProjectController.updateProject);
router.post("/:project_id/members", ProjectMemberController.addMemberToProject);
router.get("/:project_id/users", ProjectController.getUsersOfProject);
router.get("/:project_id/users/:user_id/tasks", ProjectController.getTasksOfUserInProject);

export default router;