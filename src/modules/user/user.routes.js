import { Router } from "express";
import UserController from "./user.controller.js";
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";
import AuthorizeGuard from "../../common/guards/Authorize.guard.js";

const router = Router();

router.get("/", AuthorizationGuard, AuthorizeGuard('getAllUsers'), UserController.getAllUsers);
router.get("/:user_id/tasks", AuthorizationGuard, AuthorizeGuard('getTasksOfUser'), UserController.getTasksOfUser);

export default router;