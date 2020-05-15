import {Model} from 'objection';
import path from 'path';

class User extends Model {
  static tableName = 'users';

  id!: number;
  username!: string;
  hashedpassword!: string;

  static relationMappings = {
    projects: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'Song'),
      join: {
        from: 'users.id',
        to: 'songs.user_id',
      },
    },
  };
}

export interface UserResponse {
  id: number;
  username: string;
}

export default User;
