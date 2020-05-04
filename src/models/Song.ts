import {Model} from 'objection';
import path from 'path';

class Song extends Model {
  static tableName = 'songs';

  id!: number;
  name!: string;
  artist!: string;

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, 'User'),
      join: {
        from: 'songs.id',
        through: {
          from: 'users_songs.song_id',
          to: 'users_songs.user_id',
        },
        to: 'users.id',
      },
    },
  };
}

export default Song;
