import * as Knex from 'knex';

import songs from '../../data/songs';

export async function seed(knex: Knex): Promise<void> {
  await knex('songs').del();
  await knex.raw('ALTER SEQUENCE songs_id_seq RESTART WITH 1');

  const songPromises = songs.map(async (song) => {
    const {name, artist} = song;
    await knex('songs').insert({
      song_name: name,
      artist,
    });
  });

  await Promise.all(songPromises);

  // seed user_songs join table
  await knex('user_songs').del();

  await knex('user_songs').insert([
    {
      user_id: 1,
      song_id: 1,
    },
    {
      user_id: 1,
      song_id: 2,
    },
    {
      user_id: 1,
      song_id: 3,
    },
    {
      user_id: 3,
      song_id: 2,
    },
    {
      user_id: 3,
      song_id: 4,
    },
  ]);
}
