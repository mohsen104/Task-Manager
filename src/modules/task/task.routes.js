import { Router } from "express";
import TaskController from "./task.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";
import AuthorizeGuard from "../../common/guards/Authorize.guard.js";

const router = Router();

router.get("/:task_id", AuthorizationGuard, AuthorizeGuard('read'), TaskController.getTaskDetail);
router.post("/", AuthorizationGuard, AuthorizeGuard('create'), TaskController.createTask)
router.put("/:task_id", AuthorizationGuard, AuthorizeGuard('update'), TaskController.updateTask);
router.delete("/:task_id", AuthorizationGuard, AuthorizeGuard('delete'), TaskController.deleteTask);

export default router;