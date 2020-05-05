import Song from '../models/Song';

interface CreateSongParams {
  songName: string;
  artist: string;
  userId: number;
  skillLevel: number;
}

interface UpdateSongParams {
  songName?: string;
  artist?: string;
  skillLevel?: number;
  id: number;
}

interface GetOneSongParams {
  id: number;
}

interface DeleteSongParams {
  id: number;
}

export const createSong = async (params: CreateSongParams): Promise<Song> => {
  try {
    const {songName, artist, userId, skillLevel} = params;
    const song = await Song.query().insert({
      songName,
      artist,
      userId,
      skillLevel,
    });

    return song;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSong = async (params: DeleteSongParams): Promise<number> => {
  try {
    const {id} = params;
    const result = Song.query().deleteById(id);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateSong = async (params: UpdateSongParams): Promise<Song> => {
  try {
    // unknown number of parameters can be passed in, so spread them into the query options
    const {id, ...rest} = params;
    const song: Song = await Song.query().updateAndFetchById(id, {
      ...rest,
    });

    return song;
  } catch (error) {
    console.error(error);
  }
};

export const getSongs = async (userId: number): Promise<Song[]> => {
  try {
    const songs = await Song.query().select().where('user_id', userId);

    return songs;
  } catch (error) {}
};

export const getOneSong = async (params: GetOneSongParams): Promise<Song> => {
  try {
    const {id} = params;
    const project = await Song.query().findById(id);

    return project;
  } catch (error) {
    console.error(error);
  }
};
