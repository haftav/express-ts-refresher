import {Model, snakeCaseMappers} from 'objection';
import path from 'path';

class Song extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static tableName = 'songs';

  id!: number;
  songName!: string;
  artist: string;
  userId!: number;
  skillLevel!: number;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'User'),
      join: {
        from: 'songs.user_id',
        to: 'users.id',
      },
    },
    // skillLevel: {
    //   relation: Model.BelongsToOneRelation,
    //   modelClass: path.join(__dirname, 'User'),
    //   join: {
    //     from: 'songs.skill_level',
    //     to: 'skill_levels.value',
    //   },
    // },
  };
}

export default Song;
