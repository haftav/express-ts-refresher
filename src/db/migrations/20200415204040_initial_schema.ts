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

  const skillPointsExist = await knex.schema.hasTable('skill_levels');
  if (!skillPointsExist) {
    await knex.schema.createTable('skill_levels', (table) => {
      table.increments('value').primary();
      table.string('default_title', 100);
    });
  }

  /**
   * For now just making a table of all songs, with user and skill_point
   * foreign keys. There may be repeat song entries
   * for different users. So this is currently a one-to-many
   * relationship between users and songs.
   */

  const songsExist = await knex.schema.hasTable('songs');
  if (!songsExist) {
    await knex.schema.createTable('songs', (table) => {
      table.increments('id').primary();

      table.string('song_name', 100).notNullable();
      table.string('artist', 100);
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
      table
        .integer('skill_level')
        .notNullable()
        .references('skill_levels.value')
        .onDelete('CASCADE')
        .defaultTo(1);
    });
  }

  /**
   * Example code for many-to-many schema. Leaving this here for reference
   */
  // const userSongsExist = await knex.schema.hasTable('user_songs');
  // if (!userSongsExist) {
  //   await knex.schema.createTable('user_songs', (table) => {
  //     table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
  //     table.integer('song_id').notNullable().references('songs.id').onDelete('CASCADE');
  //     table
  //       .integer('skill_level')
  //       .notNullable()
  //       .references('skill_levels.value')
  //       .onDelete('CASCADE')
  //       .defaultTo(1);
  //     table.primary(['user_id', 'song_id']);
  //   });
  // }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('songs');
  await knex.schema.dropTableIfExists('skill_levels');
  await knex.schema.dropTableIfExists('users');
}
