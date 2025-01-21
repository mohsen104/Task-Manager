import { Op } from "@sequelize/core";
import ProjectMember from "../projectMember/projectMember.model.js";
import User from "../user/user.model.js";
import Project from "./project.model.js";
import Task from "../task/task.model.js";
import { ProjectValidation, QueryParamsValidation } from "./project.validation.js";

const ProjectController = {
    getAllProject: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            await QueryParamsValidation.validateAsync({ order_by, sort_order, limit: +limit, page: +page });

            const { rows, count } = await Project.findAndCountAll({
                where: {
                    [Op.or]: {
                        title: { [Op.like]: `%${q}%` },
                        description: { [Op.like]: `%${q}%` },
                    }
                },
                order: [[order_by, sort_order]],
                limit: +limit,
                offset: ((+page - 1) * +limit),
                include: {
                    model: User,
                    attributes: ["first_name", "last_name"]
                }
            }, { raw: true });

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
    createProject: async (req, res, next) => {
        try {
            const { title, description, created_by } = req.body;

            await ProjectValidation.validateAsync({ title });

            const user = await User.findOne({ where: { id: created_by } });

            if (!user) {
                res.status(404).json({ message: "کاربر مورد نظر یافت نشد !" })
            }

            const project = await Project.create({ title, description });
            await project.setUser(user);

            const projectMember = await ProjectMember.create();
            await projectMember.setUser(user);
            await projectMember.setProject(project);

            return res.status(200).json(project.dataValues);
        } catch (error) {
            next(error);
        }
    },
    updateProject: async (req, res, next) => {
        try {
            const { project_id } = req.params;
            const { title, description } = req.body;

            const project = await Project.findOne(
                { where: { id: project_id } },
            );

            if (!project) {
                res.status(404).json({ message: "پروژه مورد نظر یافت نشد !" })
            }

            await Project.update(
                { title: title || project.title, description: description || project.description },
                {
                    where: { id: project_id },
                });

            return res.status(200).json({message:"پروژه مورد نظر ویرایش شد ."});
        } catch (error) {
            next(error);
        }
    },
    deleteProject: async (req, res, next) => {
        try {
            const { project_id } = req.params;

            const project = await Project.findOne(
                { where: { id: project_id } },
            );

            if (!project) {
                res.status(404).json({ message: "پروژه مورد نظر یافت نشد !" })
            }

            await Project.destroy({ where: { id: project_id } });

            return res.status(200).json({ message: "پروژه مورد نظر حذف شد !" });
        } catch (error) {
            next(error);
        }
    },
    getUsersOfProject: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            await QueryParamsValidation.validateAsync({ order_by, sort_order, limit: +limit, page: +page });

            const { project_id } = req.params;

            const project = await ProjectMember.findOne({ where: { project_id } });

            if (!project) {
                res.status(404).json({ message: "پروژه مورد نظر یافت نشد !" })
            }

            const { rows, count } = await ProjectMember.findAndCountAll({
                where: { project_id },
                order: [[order_by, sort_order]],
                limit: +limit,
                offset: ((+page - 1) * +limit),
                attributes: ["id"],
                include: {
                    model: User,
                    attributes: ["id", "first_name", "last_name", "email", "created_at"],
                    where: {
                        [Op.or]: {
                            first_name: { [Op.like]: `%${q}%` },
                            last_name: { [Op.like]: `%${q}%` },
                        }
                    },
                },
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
    getTasksOfUserInProject: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            await QueryParamsValidation.validateAsync({ order_by, sort_order, limit: +limit, page: +page });

            const { user_id, project_id } = req.params;

            const { rows, count } = await Task.findAndCountAll({
                where: {
                    user_id,
                    project_id,
                    [Op.or]: {
                        title: { [Op.like]: `%${q}%` },
                        description: { [Op.like]: `%${q}%` },
                    }
                },
                order: [[order_by, sort_order]],
                limit: +limit,
                offset: ((+page - 1) * +limit),
                raw: true
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
}

export default ProjectController;