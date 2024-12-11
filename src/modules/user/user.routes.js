import { Router } from "express";
import UserController from "./user.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";

const router = Router();

router.get("/", AuthorizationGuard, UserController.getAllUsers);
router.get("/:user_id/tasks", AuthorizationGuard, UserController.getTasksOfUser);

export default router;