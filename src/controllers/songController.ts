import {RequestHandler} from 'express';

import * as songService from '../services/song.service';
import * as HttpError from '../utils/httpError';
import {successResponse} from '../utils/httpResponse';

export const createSong: RequestHandler = async (req, res) => {
  const {id} = req.userData;
  const {songName, artist, skillLevel} = req.body;
  const song = await songService.createSong({songName, artist, userId: id, skillLevel});

  if (!song) {
    throw new HttpError.ApplicationError('Unable to create song.');
  }

  return res.status(201).json(
    successResponse({
      song,
    })
  );
};

export const deleteSong: RequestHandler = async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  const userId = req.userData.id;
  const song = await songService.getOneSong({id: songId});

  if (!song) {
    throw new HttpError.NotFoundError();
  }

  if (song.userId !== userId) {
    throw new HttpError.ForbiddenError();
  }

  await songService.deleteSong({id: songId});

  return res.status(200).json(successResponse({}));
};

// get songs specific to user
export const getSongs: RequestHandler = async (req, res) => {
  const userId = req.userData.id;
  const songs = await songService.getSongs(userId);

  return res.status(200).json(
    successResponse({
      songs,
    })
  );
};

export const getOneSong: RequestHandler = async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  const userId = req.userData.id;
  const song = await songService.getOneSong({id: songId});

  if (!song) {
    throw new HttpError.NotFoundError();
  }

  if (song.userId !== userId) {
    throw new HttpError.ForbiddenError();
  }

  return res.status(200).json(
    successResponse({
      song,
    })
  );
};

export const updateSong: RequestHandler = async (req, res) => {
  const songId = parseInt(req.params.id);
  const userId = req.userData.id;

  const {songName, artist, skillLevel} = req.body;

  const song = await songService.getOneSong({id: songId});

  if (!song) {
    throw new HttpError.NotFoundError();
  }

  if (song.userId !== userId) {
    throw new HttpError.ForbiddenError();
  }

  const updatedSong = await songService.updateSong({
    id: songId,
    ...(songName && {songName}),
    ...(artist && {artist}),
    ...(skillLevel && {skillLevel}),
  });

  // should check to make sure it updates before returning

  return res.status(200).json(
    successResponse({
      song: updatedSong,
    })
  );
};
