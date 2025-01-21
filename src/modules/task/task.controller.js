import User from "../user/user.model.js";
import Project from "../project/project.model.js";
import Task from "./task.model.js";
import { TaskValidation } from "./task.validation.js";

const TaskController = {
    getTaskDetail: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const task = await Task.findOne({
                where: { id: task_id },
                raw: true,
            });
            if (!task) {
                res.status(404).json({ message: "تسک مورد نظر یافت نشد !" })
            }
            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },
    updateTask: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const { title, description, status, priority, due_date } = req.body;

            const task = await Task.findOne({ id: task_id });
            if (!task) {
                res.status(404).json({ message: "تسک مورد نظر یافت نشد !" })
            }

            await Task.update(
                { title: title || task.title, description: description || task.description, status: status || task.status, priority: priority || task.priority, due_date: due_date || task.due_date },
                {
                    where: { id: task_id },
                });
            return res.status(200).json({ message: "تسک مورد نظر ویرایش شد ." });
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const { task_id } = req.params;
            const task = await Task.findOne({ where: { id: task_id } });
            if (!task) {
                res.status(404).json({ message: "تسک مورد نظر یافت نشد !" })
            }
            await Task.destroy({
                where: { id: task_id },
            });
            return res.status(200).json({ message: "تسک مورد نظر با موفقیت حذف شد ." });
        } catch (error) {
            next(error);
        }
    },
    createTask: async (req, res, next) => {
        try {
            const { title, description, status, priority, due_date, project_id, user_id } = req.body;

            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                res.status(404).json({ message: "کاربر مورد نظر یافت نشد !" })
            }

            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) {
                res.status(404).json({ message: "پروژه مورد نظر یافت نشد !" })
            }

            await TaskValidation.validateAsync({ title, status, priority });

            const task = await Task.create({ title, description, status, priority, due_date });
            await task.setUser(user);
            await task.setProject(project);

            return res.status(200).json(task.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default TaskController;