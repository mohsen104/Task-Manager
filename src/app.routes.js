import { Router } from "express";
import UserRoutes from './modules/user/user.routes.js';
import ProjectRoutes from './modules/project/project.routes.js';
import TaskRoutes from './modules/task/task.routes.js';
import AuthRoutes from './modules/auth/auth.routes.js';

const router = Router();

router.use("/", AuthRoutes);
router.use("/tasks", TaskRoutes);
router.use("/users", UserRoutes);
router.use("/projects", ProjectRoutes);

export default router;