import User from "../user/user.model.js";
import Project from "../project/project.model.js";
import Task from "./task.model.js";

const TaskController = {
    getTaskDetail: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const task = await Task.findOne({
                where: { id: task_id },
                raw: true,
            });
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },
    updateTask: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const { title, description, status, priority, due_date } = req.body;
            const task = await Task.update(
                { title, description, status, priority, due_date },
                {
                    where: { id: task_id },
                });
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const task = await Task.destroy({
                where: { id: task_id },
            });
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },
    createTask: async (req, res, next) => {
        try {
            const { title, description, status, priority, due_date, project_id, user_id } = req.body;

            const task = await Task.create({ title, description, status, priority, due_date });

            const user = await User.findOne({ where: { id: user_id } });
            await task.setUser(user);

            const project = await Project.findOne({ where: { id: project_id } });
            await task.setProject(project);

            return res.status(200).json(task.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default TaskController;