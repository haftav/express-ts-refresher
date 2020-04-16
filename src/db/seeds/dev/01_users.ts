import bcrypt from 'bcrypt';
import * as Knex from 'knex';

import users from '../../data/users';

export async function seed(knex: Knex): Promise<void[]> {
  // Deletes ALL existing entries
  await knex('users').del();

  const insertPromises = users.map(async (user) => {
    const {username, password} = user;
    const hashedpassword = await bcrypt.hash(password, 10);

    await knex('users').insert({
      username,
      hashedpassword,
    });
  });

  return Promise.all(insertPromises);
}
