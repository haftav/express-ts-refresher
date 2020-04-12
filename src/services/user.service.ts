import User from '../models/User';

export const getUsers = async (): Promise<User[]> => {
  const users = await User.query().select('username');

  return users;
};
