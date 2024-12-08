import Joi from 'joi';

export const AuthValidation = Joi.object({
    first_name: Joi.string()
        .required()
        .messages({ 'string.empty': "وارد کردن نام اجباری می باشد !" }),

    last_name: Joi.string()
        .required()
        .messages({ 'string.empty': "وارد کردن نام خانوادگی اجباری می باشد !" }),

    phone: Joi.string()
        .required()
        .messages({ 'string.empty': "وارد کردن شماره موبایل اجباری می باشد !" }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({ '*': "ایمیل وارد شده معتبر نمی باشد !" }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({ '*': "رمز عبور وارد شده معتبر نمی باشد !" }),

    repeat_password: Joi.string()
        .valid(Joi.ref('password'))
        .messages({ 'any.only': "رمز عبور و تکرار آن برابر نیست !" })
});