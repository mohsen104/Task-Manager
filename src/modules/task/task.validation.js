import Joi from 'joi';

export const TaskValidation = Joi.object({
    title: Joi.string()
        .required()
        .messages({ 'string.empty': "وارد کردن عنوان اجباری می باشد !" }),
    status: Joi.string()
        .valid("todo", "doing", "done")
        .messages({ 'any.only': "مقدار 'status' معتبر نمی باشد !" }),
    priority: Joi.string()
        .valid("low", "medium", "high")
        .messages({ 'any.only': "مقدار 'priority' معتبر نمی باشد !" }),
});

export const QueryParamsValidation = Joi.object({
    order_by: Joi.string().valid("id", "title", "description", "created_at").messages({ 'any.only': "مقدار 'order_by' معتبر نمی باشد !" }),
    sort_order: Joi.string().valid("asc", "desc").messages({ 'any.only': "مقدار 'sort_order' باید یکی از این موارد باشه (asc, desc)" }),
    limit: Joi.number().min(1).messages({ '*': "مقدار 'limit' معتبر نمی باشد !" }),
    page: Joi.number().min(1).messages({ '*': "مقدار 'page' معتبر نمی باشد !" }),
})