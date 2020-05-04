import * as Knex from 'knex';

import songs from '../../data/songs';

export async function seed(knex: Knex): Promise<void> {
  await knex('songs').del();
  await knex.raw('ALTER SEQUENCE songs_id_seq RESTART WITH 1');

  const songPromises = songs.map(async (song) => {
    const {name, artist, userId, skillLevel} = song;
    await knex('songs').insert({
      song_name: name,
      artist,
      user_id: userId,
      skill_level: skillLevel,
    });
  });

  await Promise.all(songPromises);
}
