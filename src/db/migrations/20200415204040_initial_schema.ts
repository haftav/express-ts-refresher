import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table.string('username', 15);
    table.string('hashedpassword', 60);
  });

  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();

    table.string('title', 100);
    table.integer('userId').unsigned().references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('projects');
  await knex.schema.dropTableIfExists('users');
}
