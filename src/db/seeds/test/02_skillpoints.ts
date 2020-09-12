import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('skill_levels').del();
  await knex.raw('ALTER SEQUENCE skill_levels_value_seq RESTART WITH 1');

  await knex('skill_levels').insert([
    {
      default_title: 'Beginner',
    },
    {
      default_title: 'Intermediate',
    },
    {
      default_title: 'Advanced',
    },
    {
      default_title: 'Expert',
    },
  ]);
}
