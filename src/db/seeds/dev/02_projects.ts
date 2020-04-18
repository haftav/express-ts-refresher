import * as Knex from 'knex';

import projects from '../../data/projects';

export async function seed(knex: Knex): Promise<void[]> {
  await knex('projects').del();

  const promises = projects.map(async (project) => {
    const {title, userId} = project;
    await knex('projects').insert({
      title,
      userId,
    });
  });

  return Promise.all(promises);
}
