import * as Knex from 'knex';

import projects from '../../data/projects';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex('projects').del();
}
