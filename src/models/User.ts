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
      modelClass: path.join(__dirname, 'Project'),
      join: {
        from: 'users.id',
        to: 'projects.userId',
      },
    },
  };
}

export default User;
