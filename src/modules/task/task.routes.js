import { Router } from "express";
import TaskController from "./task.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";
import AuthorizeGuard from "../../common/guards/Authorize.guard.js";

const router = Router();

router.get("/:task_id", AuthorizationGuard, AuthorizeGuard('getTaskDetail'), TaskController.getTaskDetail);
router.post("/", AuthorizationGuard, AuthorizeGuard('createTask'), TaskController.createTask)
router.put("/:task_id", AuthorizationGuard, AuthorizeGuard('updateTask'), TaskController.updateTask);
router.delete("/:task_id", AuthorizationGuard, AuthorizeGuard('deleteTask'), TaskController.deleteTask);

export default router;