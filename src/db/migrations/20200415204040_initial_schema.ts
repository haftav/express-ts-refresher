import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const usersExist = await knex.schema.hasTable('users');
  if (!usersExist) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();

      table.string('username', 15);
      table.string('hashedpassword', 60);
    });
  }

  // await knex.schema.createTable('projects', (table) => {
  //   table.increments('id').primary();

  //   table.string('title', 100);
  //   table.integer('userId').unsigned().references('users.id');
  // });

  const songsExist = await knex.schema.hasTable('songs');
  if (!songsExist) {
    await knex.schema.createTable('songs', (table) => {
      table.increments('id').primary();

      table.string('song_name', 100);
      table.string('artist', 100);
    });
  }

  const userSongsExist = await knex.schema.hasTable('user_songs');
  if (!userSongsExist) {
    await knex.schema.createTable('user_songs', (table) => {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('song_id').references('songs.id').onDelete('CASCADE');
      table.primary(['user_id', 'song_id']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_songs');
  await knex.schema.dropTableIfExists('songs');
  await knex.schema.dropTableIfExists('users');
}
