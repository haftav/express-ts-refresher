import bcrypt from 'bcrypt';

import User from '../models/User';

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
