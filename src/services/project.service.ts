import Project from '../models/Project';

interface CreateProjectParams {
  title: string;
  userId: number;
}

interface UpdateProjectParams {
  title: string;
  id: number;
}

interface GetOneProjectParams {
  id: number;
}

const createProject = async (params: CreateProjectParams): Promise<Project> => {
  try {
    const {title, userId} = params;
    const project: Project = await Project.query().insert({
      title,
      userId,
    });

    return project;
  } catch (error) {
    console.error(error);
  }
};

const updateProject = async (params: UpdateProjectParams): Promise<Project> => {
  try {
    const {title, id} = params;
    const project: Project = await Project.query().updateAndFetchById(id, {
      title,
    });

    return project;
  } catch (error) {}
};

const getProjects = async (): Promise<Project[]> => {
  try {
    const projects: Project[] = await Project.query().select();

    return projects;
  } catch (error) {}
};

const getOneProject = async (params: GetOneProjectParams): Promise<Project> => {
  try {
    const {id} = params;
    const project = await Project.query().findById(id);

    return project;
  } catch (error) {}
};

export default {
  createProject,
  getProjects,
  getOneProject,
  updateProject,
};
