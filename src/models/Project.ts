import {Model} from 'objection';
import path from 'path';

class Project extends Model {
  static tableName = 'projects';

  id!: number;
  title!: string;
  userId!: number; // foreign key

  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'User'),
      join: {
        from: 'projects.userId',
        to: 'users.id',
      },
    },
  };
}

export default Project;
