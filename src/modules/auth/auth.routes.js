import { Router } from "express";
import AuthController from './auth.controller.js';
import AuthorizationGuard from "../../common/guards/Authorization.guard.js";

const router = Router();

router.post("/authentication", AuthController.authentication);
router.post("/login/otp", AuthController.loginOtp);
router.post("/login/password", AuthController.loginPassword);
router.post("/username/update", AuthorizationGuard, AuthController.usernameUpdate);
router.post("/email/update", AuthorizationGuard, AuthController.emailUpdate);
router.post("/password/update", AuthorizationGuard, AuthController.passwordUpdate);
router.get("/logout", AuthorizationGuard, AuthController.logout);

export default router;