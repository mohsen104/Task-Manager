import { Op } from "@sequelize/core";
import User from "./user.model.js";
import Task from "../task/task.model.js";

const UserController = {
    getAllUsers: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            const { rows, count } = await User.findAndCountAll(
                {
                    where: {
                        [Op.or]: {
                            first_name: { [Op.like]: `%${q}%` },
                            last_name: { [Op.like]: `%${q}%` },
                        }
                    },
                    order: [[order_by, sort_order]],
                    limit: +limit,
                    offset: ((+page - 1) * +limit),
                    attributes: ["id", "first_name", "last_name", "email", "created_at"],
                    raw: true
                }
            );

            res.status(200).json({
                count,
                page: +page,
                limit: +limit,
                data: rows,
            });
        } catch (error) {
            next(error);
        }
    },
    getTasksOfUser: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            const { user_id } = req.params;

            const { rows, count } = await Task.findAndCountAll({
                where: {
                    user_id,
                    [Op.or]: {
                        title: { [Op.like]: `%${q}%` },
                        description: { [Op.like]: `%${q}%` },
                    }
                },
                order: [[order_by, sort_order]],
                limit: +limit,
                offset: ((+page - 1) * +limit),
                raw: true,
            });

            return res.status(200).json({
                count,
                page: +page,
                limit: +limit,
                data: rows,
            });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { first_name, last_name, phone, email, password } = req.body;

            const user = await User.create({ first_name, last_name, phone, email, password }, { raw: true });

            res.status(200).json(user.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default UserController;