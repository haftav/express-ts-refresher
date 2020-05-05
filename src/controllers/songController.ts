import {RequestHandler} from 'express';

import * as songService from '../services/song.service';
import {failureResponse, successResponse} from '../utils/httpResponse';

export const createSong: RequestHandler = async (req, res) => {
  try {
    const {id} = req.userData;
    const {songName, artist, skillLevel} = req.body;

    const song = await songService.createSong({songName, artist, userId: id, skillLevel});

    if (!song) {
      throw new Error();
    }

    return res.status(201).json(
      successResponse({
        song,
      })
    );
  } catch (error) {}
};

export const deleteSong: RequestHandler = async (req, res) => {
  try {
    const songId = parseInt(req.params.id, 10);
    const userId = req.userData.id;
    const song = await songService.getOneSong({id: songId});

    if (!song) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (song.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
    }

    await songService.deleteSong({id: songId});

    return res.status(200).json(successResponse({}));
  } catch (error) {
    console.error(error);
  }
};

// get songs specific to user
export const getSongs: RequestHandler = async (req, res) => {
  try {
    const userId = req.userData.id;
    const songs = await songService.getSongs(userId);

    return res.status(200).json(
      successResponse({
        songs,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const getOneSong: RequestHandler = async (req, res) => {
  try {
    const songId = parseInt(req.params.id, 10);
    const userId = req.userData.id;
    const song = await songService.getOneSong({id: songId});

    if (!song) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (song.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
    }

    return res.status(200).json(
      successResponse({
        song,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateSong: RequestHandler = async (req, res) => {
  try {
    const songId = parseInt(req.params.id);
    const userId = req.userData.id;

    const {songName, artist, skillLevel} = req.body;

    const song = await songService.getOneSong({id: songId});

    if (!song) {
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    if (song.userId !== userId) {
      return res.status(403).json(
        failureResponse({
          message: '403 Forbidden',
        })
      );
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
  } catch (error) {}
};
