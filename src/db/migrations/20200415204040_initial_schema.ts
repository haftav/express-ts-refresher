import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table.string('username', 15);
    table.string('hashedpassword', 60);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  console.log('schema dropped');
}
