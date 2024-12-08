import User from "../user/user.model.js";
import { AuthValidation } from "./auth.validation.js";

const AuthController = {
    login: async (req, res, next) => {
        try {
            const { first_name, last_name, phone, email, password, repeat_password } = req.body;

            await AuthValidation.validateAsync({ first_name, last_name, phone, email, password, repeat_password });

            const user = await User.create({ first_name, last_name, phone, email, password }, { raw: true });

            res.status(200).json(user.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default AuthController;