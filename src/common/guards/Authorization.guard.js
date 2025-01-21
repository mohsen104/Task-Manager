import AuthMessage from '../../modules/auth/auth.message.js';
import User from '../../modules/user/user.model.js';

const AuthorizationGuard = async (req, res, next) => {
    try {
        const user_id = req?.session?.user_id;
        if (user_id) {
            const user = await User.findOne({ where: { id: user_id } });
            if (user) {
                req.user = user;
                return next();
            }
        }
        res.status(401).json({ message: AuthMessage.Unauthorized });
        return { access: false };
    } catch (error) {
        next(error);
    }
};

export default AuthorizationGuard;