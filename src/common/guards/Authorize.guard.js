import Permission from '../../modules/permission/permission.model.js';
import RolePermission from '../../modules/rolePermission/rolePermission.model.js';

const AuthorizeGuard = (reqPermission) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const userPermissions = await RolePermission.findAll({ where: { role_id: user.role_id }, include: { model: Permission }, raw: true });
            let isAccess = false;
            userPermissions.forEach(i => {
                if (reqPermission == i['permission.name']) {
                    isAccess = true;
                    return;
                }
            });
            if (isAccess) {
                return next();
            }
            res.status(403).json({ message: "شما دسترسی کافی ندارید ." });
            return { access: false };
        } catch (error) {
            next(error);
        }
    }
};

export default AuthorizeGuard;