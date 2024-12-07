import { Router } from "express";
import UserController from "./user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:user_id/tasks", UserController.getTasksOfUser);

export default router;