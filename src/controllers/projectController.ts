import {RequestHandler} from 'express';

import * as projectService from '../services/project.service';
import {failureResponse, successResponse} from '../utils/httpResponse';

export const createProject: RequestHandler = async (req, res) => {
  try {
    const {id} = req.userData;
    const {title} = req.body;

    const project = await projectService.createProject({title, userId: id});

    if (!project) {
      throw new Error();
    }

    return res.status(200).json(
      successResponse({
        project,
      })
    );
  } catch (error) {}
};

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const userId = req.userData.id;
    const project = await projectService.getOneProject({id: projectId});

    if (!project) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (project.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
    }

    await projectService.deleteProject({id: projectId});

    return res.status(200).json(successResponse({}));
  } catch (error) {
    console.error(error);
  }
};

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await projectService.getProjects();

    return res.status(200).json(
      successResponse({
        projects,
      })
    );
  } catch (error) {}
};

export const getOneProject: RequestHandler = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const userId = req.userData.id;
    const project = await projectService.getOneProject({id: projectId});

    if (!project) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (project.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
    }

    return res.status(200).json(
      successResponse({
        project,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const {title} = req.body;
    const userId = req.userData.id;

    const project = await projectService.getOneProject({id: projectId});

    if (!project) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (project.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
    }

    const updatedProject = await projectService.updateProject({title, id: projectId});

    return res.status(200).json(
      successResponse({
        project: updatedProject,
      })
    );
  } catch (error) {}
};
