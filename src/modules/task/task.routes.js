import { Router } from "express";
import TaskController from "./task.controller.js";

const router = Router();

router.get("/:task_id", TaskController.getTaskDetail);
router.post("/:task_id", TaskController.createTask)
router.put("/:task_id", TaskController.updateTask);
router.delete("/:task_id", TaskController.deleteTask);

export default router;