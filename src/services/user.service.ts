import bcrypt from 'bcrypt';

import User from '../models/User';

export const getUser = async (id: number): Promise<User> => {
  const user = await User.query().findById(id);

  return user;
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await User.query().select('id', 'username');

    return users;
  } catch (error) {
    console.error(error);
  }
};

interface CreateUserParams {
  username: string;
  password: string;
}

export const createUser = async (params: CreateUserParams): Promise<User | void> => {
  try {
    const {username, password} = params;

    const userWithUsername = await User.query().findOne({username});
    if (userWithUsername) {
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userArray: User[] = await User.knexQuery()
      .insert({
        username: username,
        hashedpassword: passwordHash,
      })
      .returning(['id', 'username']);

    const user = userArray[0];

    return user;
  } catch (error) {}
};

interface DeleteUserParams {
  id: string;
}

export const deleteUser = async (params: DeleteUserParams): Promise<number> => {
  try {
    const {id} = params;
    const deletedUsers: number = await User.query().deleteById(id);
    return deletedUsers;
  } catch (err) {}
};

interface VerifyUserParams {
  username: string;
  password: string;
}

export const verifyUser = async (params: VerifyUserParams): Promise<User | void> => {
  const {username, password} = params;
  const user: User = await User.query().findOne({username});
  if (!user) {
    return;
  }

  const result = await bcrypt.compare(password, user.hashedpassword);
  if (!result) {
    return;
  }

  return user;
};
