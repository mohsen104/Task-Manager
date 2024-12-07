import { Op } from "@sequelize/core";
import ProjectMember from "../projectMember/projectMember.model.js";
import User from "../user/user.model.js";
import Project from "./project.model.js";
import Task from "../task/task.model.js";

const ProjectController = {
    getAllProject: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

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

            const project = await Project.create({ title, description });

            const user = await User.findOne({ where: { id: created_by } });
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
            const project = await Project.update(
                { title, description },
                {
                    where: { id: project_id },
                });
            return res.status(200).json(project);
        } catch (error) {
            next(error);
        }
    },
    getUsersOfProject: async (req, res, next) => {
        try {
            const { q = '', order_by = 'created_at', sort_order = 'asc', limit = 10, page = 1 } = req.query;

            const { project_id } = req.params;

            const { rows, count } = await ProjectMember.findAndCountAll({
                where: {
                    project_id,
                    [Op.or]: {
                        first_name: { [Op.like]: `%${q}%` },
                        last_name: { [Op.like]: `%${q}%` },
                    }
                },
                order: [[order_by, sort_order]],
                limit: +limit,
                offset: ((+page - 1) * +limit),
                attributes: ["id"],
                include: {
                    model: User,
                    attributes: ["id", "first_name", "last_name", "email", "created_at"]
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