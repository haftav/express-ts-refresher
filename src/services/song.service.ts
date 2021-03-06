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
  const {songName, artist, userId, skillLevel} = params;

  const {id} = await Song.query().insert({
    songName,
    artist,
    userId,
    skillLevel,
  });

  const song = await Song.query()
    .findById(id)
    .select('song_name', 'artist', 'id')
    .allowGraph('[skill]')
    .withGraphFetched('[skill]');

  return song;
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
    await Song.query().patchAndFetchById(id, {
      ...rest,
    });

    const song = await Song.query()
      .findById(id)
      .select('song_name', 'artist', 'id')
      .allowGraph('[skill]')
      .withGraphFetched('[skill]');

    return song;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSongs = async (userId: number): Promise<Song[]> => {
  const currentTime = Date.now();
  const songs = await Song.query()
    .select('song_name', 'artist', 'id')
    .orderBy('id', 'desc')
    .allowGraph('[user, skill]')
    .withGraphFetched('[skill]')
    .modifyGraph('user', (builder) => {
      builder.select('username');
    })
    .where('user_id', userId);

  const endTime = Date.now();
  const duration = endTime - currentTime;

  console.log('GET SONGS DURATION:', duration);

  return songs;
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
