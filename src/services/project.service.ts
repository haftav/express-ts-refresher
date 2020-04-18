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

interface DeleteProjectParams {
  id: number;
}

export const createProject = async (params: CreateProjectParams): Promise<Project> => {
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

export const deleteProject = async (params: DeleteProjectParams): Promise<number> => {
  try {
    const {id} = params;
    const result = Project.query().deleteById(id);

    return result;
  } catch (error) {}
};

export const updateProject = async (params: UpdateProjectParams): Promise<Project> => {
  try {
    const {title, id} = params;
    const project: Project = await Project.query().updateAndFetchById(id, {
      title,
    });

    return project;
  } catch (error) {}
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const projects: Project[] = await Project.query().select();

    return projects;
  } catch (error) {}
};

export const getOneProject = async (params: GetOneProjectParams): Promise<Project> => {
  try {
    const {id} = params;
    const project = await Project.query().findById(id);

    return project;
  } catch (error) {}
};
