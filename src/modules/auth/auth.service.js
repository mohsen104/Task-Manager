import User from '../user/user.model.js';
import { generateCodeOtp, loginMethod, responseFormatter } from '../../common/utils/functions.js';
import UserMessage from './auth.message.js';
import { redisClient } from '../../common/configs/redis.config.js';
import pkg from 'bcryptjs';
import { Op } from '@sequelize/core';
const { compare } = pkg;

const AuthService = {
    authentication: async (userDto) => {
        const { username } = userDto;

        const login_method = loginMethod(username);

        const user = await User.findOne({
            where: {
                [Op.or]: {
                    phone: username,
                    email: username,
                }
            }
        });
        let has_account = false;
        if (user) has_account = true;
        const has_password = !!user?.password;

        if (login_method == "otp") {
            const sms_ttl = 180;
            const phone = username;
            const keyOtp = generateCodeOtp();
            const isExistsOtp = await redisClient.exists(`sms_otp_${phone}`);
            if (!isExistsOtp) {
                redisClient.setEx(`sms_otp_${phone}`, sms_ttl, `${keyOtp},${phone}`);
            };
            return responseFormatter({
                status: 200,
                data: { phone, has_account, login_method, sms_ttl, has_password }
            });
        }

        if (login_method == "password") {
            const email = username;
            if (!has_account) {
                return responseFormatter({
                    status: 200,
                    message: UserMessage.NotFoundEmail,
                });
            }
            return responseFormatter({
                status: 200,
                data: { email, has_account, login_method, has_password }
            });
        }

        if (login_method == "nothing") {
            return responseFormatter({
                status: 200,
                message: UserMessage.NothingLoginMethod
            });
        }
    },
    loginOtp: async (userDto) => {
        const { phone, otp, req } = userDto;
        const sms_otp = await redisClient.get(`sms_otp_${phone}`);
        if (!sms_otp) {
            return responseFormatter({
                status: 200,
                message: UserMessage.OtpExpired
            });
        }
        if (sms_otp != `${otp},${phone}`) {
            return responseFormatter({
                status: 200,
                message: UserMessage.OtpNotCurrent
            });
        }
        const [user, created] = await User.findOrCreate({
            where: { phone },
            defaults: { phone, verify: true }
        });

        if (!created) {
            await user.update({ verify: true });
        }

        req.session.user_id = user.id;

        redisClient.del(`sms_otp_${phone}`);
        return responseFormatter({
            status: 200,
            message: UserMessage.SuccessLogin
        });
    },
    loginPassword: async (userDto) => {
        const { username, password, req } = userDto;
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    phone: username,
                    email: username,
                }
            }
        });
        if (!user) {
            return responseFormatter({
                status: 200,
                message: UserMessage.NotFoundUser
            });
        }
        if (user?.password != password) {
            return responseFormatter({
                status: 200,
                message: UserMessage.PasswordNotCurrent
            });
        }

        req.session.user_id = user.id;

        return responseFormatter({
            status: 200,
            message: UserMessage.SuccessLogin
        });
    },
    usernameUpdate: async (userDto) => {
        const { phone, first_name, last_name } = userDto;
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return responseFormatter({
                status: 200,
                message: UserMessage.NotFoundUser
            });
        }
        user.first_name = first_name;
        user.last_name = last_name;
        await user.save();
        return responseFormatter({
            status: 200,
            message: UserMessage.SuccessUsernameUpdate
        });
    },
    emailUpdate: async (userDto) => {
        const { phone, email } = userDto;
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return responseFormatter({
                status: 200,
                message: UserMessage.NotFoundUser
            });
        }
        const isDuplicateEmail = await User.findOne({ where: { email } });
        if (isDuplicateEmail) {
            return responseFormatter({
                status: 200,
                message: UserMessage.EmailDuplicate
            });
        }
        user.email = email;
        await user.save();
        return responseFormatter({
            status: 200,
            message: UserMessage.SuccessEmailUpdate
        });
    },
    passwordUpdate: async (userDto) => {
        const { phone, userPassword, current_password, new_password } = userDto;
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return responseFormatter({
                status: 200,
                message: UserMessage.NotFoundUser
            });
        }
        if (!compare(current_password, userPassword)) {
            return responseFormatter({
                status: 200,
                message: UserMessage.PasswordNotCurrent
            });
        }
        if (compare(new_password, userPassword)) {
            return responseFormatter({
                status: 200,
                message: UserMessage.PasswordDuplicate
            });
        }
        user.password = new_password;
        await user.save();
        return responseFormatter({
            status: 200,
            message: UserMessage.SuccessPasswordUpdate
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("session-id");
        return;
    },
}

export default AuthService;