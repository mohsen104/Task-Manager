import Project from "../project/project.model.js";
import User from "../user/user.model.js";
import ProjectMember from "./projectMember.model.js";

const ProjectMemberController = {
    addMemberToProject: async (req, res, next) => {
        try {
            const { project_id } = req.params;
            const { user_id } = req.body;

            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) {
                res.status(404).json({ message: "پروژه مورد نظر یافت نشد !" })
            }

            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                res.status(404).json({ message: "کاربر مورد نظر یافت نشد !" })
            }

            const projectMember = await ProjectMember.findOne({ where: { project_id, user_id } });

            if (projectMember) {
                res.status(200).json({ message: "کاربر مورد نظر قبلا به پروژه اضافه شده ." })
            }

            const newProjectMember = await ProjectMember.create();
            await newProjectMember.setUser(user);
            await newProjectMember.setProject(project);

            return res.status(200).json(newProjectMember.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default ProjectMemberController;