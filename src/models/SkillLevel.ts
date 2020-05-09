import {Model, snakeCaseMappers} from 'objection';
import path from 'path';

class SkillLevel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static tableName = 'skill_levels';

  value!: number;
  defaultTitle!: string;

  static relationMappings = {
    songs: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'Song'),
      join: {
        from: 'skill_levels.value',
        to: 'songs.skill_level',
      },
    },
  };
}

export default SkillLevel;
