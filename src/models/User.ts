import {Model} from 'objection';

class User extends Model {
  static tableName = 'users';

  id!: number;
  username!: string;
  hashedpassword!: string;
}

export default User;
