import { authenticationSchema, emailSchema, loginOtpSchema, loginPasswordSchema, passwordSchema, usernameSchema } from "./auth.validation.js";
import AuthMessage from "./auth.message.js";
import AuthService from "./auth.service.js";

const AuthController = {
    authentication: async (req, res, next) => {
        try {
            const { username } = req.body;
            await authenticationSchema.validateAsync({ username });
            const response = await AuthService.authentication({ username });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    loginOtp: async (req, res, next) => {
        try {
            const { phone, otp } = req.body;
            await loginOtpSchema.validateAsync({ phone, otp });
            const response = await AuthService.loginOtp({ phone, otp, req });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    loginPassword: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            await loginPasswordSchema.validateAsync({ username, password });
            const response = await AuthService.loginPassword({ username, password, req });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    usernameUpdate: async (req, res, next) => {
        try {
            const { phone } = req.user;
            const { first_name, last_name } = req.body;
            await usernameSchema.validateAsync({ first_name, last_name });
            const response = await AuthService.usernameUpdate({ phone, first_name, last_name });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    emailUpdate: async (req, res, next) => {
        try {
            const { phone } = req.user;
            const { email } = req.body;
            await emailSchema.validateAsync({ email });
            const response = await AuthService.emailUpdate({ phone, email });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    passwordUpdate: async (req, res, next) => {
        try {
            const { phone, password: userPassword } = req.user;
            const { current_password, new_password, repeat_password } = req.body;
            await passwordSchema.validateAsync({ password: new_password, repeat_password });
            const response = await AuthService.passwordUpdate({ phone, userPassword, current_password, new_password });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            AuthService.logout(req, res);
            res.status(200).json({ message: AuthMessage.Logout });
        } catch (error) {
            next(error);
        }
    },
}

export default AuthController;