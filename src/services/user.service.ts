import bcrypt from 'bcrypt';

import User from '../models/User';

export const getUsers = async (): Promise<User[]> => {
  const users = await User.query().select('username');

  return users;
};

export interface CreateUserParams {
  username: string;
  password: string;
}

export const createUser = async (params: CreateUserParams): Promise<User> => {
  const {username, password} = params;

  const passwordHash = await bcrypt.hash(password, 10);

  const userArray: User[] = await User.knexQuery()
    .insert({
      username: username,
      hashedpassword: passwordHash,
    })
    .returning(['id', 'username']);

  const user = userArray[0];

  return user;
};
