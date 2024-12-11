import { Router } from "express";
import TaskController from "./task.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";

const router = Router();

router.get("/:task_id", AuthorizationGuard, TaskController.getTaskDetail);
router.post("/", AuthorizationGuard, TaskController.createTask)
router.put("/:task_id", AuthorizationGuard, TaskController.updateTask);
router.delete("/:task_id", AuthorizationGuard, TaskController.deleteTask);

export default router;