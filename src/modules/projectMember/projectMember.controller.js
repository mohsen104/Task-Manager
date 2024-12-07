import Project from "../project/project.model.js";
import User from "../user/user.model.js";
import ProjectMember from "./projectMember.model.js";

const ProjectMemberController = {
    addMemberToProject: async (req, res, next) => {
        try {
            const { project_id, user_id } = req.body;

            const projectMember = await ProjectMember.create();

            const user = await User.findOne({ where: { id: user_id } });
            await projectMember.setUser(user);

            const project = await Project.findOne({ where: { id: project_id } });
            await projectMember.setProject(project);

            return res.status(200).json(projectMember.dataValues);
        } catch (error) {
            next(error);
        }
    },
}

export default ProjectMemberController;