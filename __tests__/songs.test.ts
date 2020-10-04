import request from 'supertest';

import app from '../src/app';
import User from '../src/models/User';
import {createJWT} from '../src/utils/auth';

let token: string;

beforeAll(() => {
  token = createJWT({
    id: 3,
    username: 'nathan',
  } as User);
});

describe('/songs', () => {
  test('GET /songs -> returns songs owned by user', () => {
    request(app)
      .get('/api/songs')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .then((res) => {
        expect(res.body.data.songs[0]).toMatchObject({
          songName: 'Is This It?',
          artist: 'The Strokes',
          id: 5,
          skill: {value: 1, defaultTitle: 'Beginner'},
        });
        expect(res.body.data.songs[1]).toMatchObject({
          songName: 'Sweet Child of Mine',
          artist: 'Guns and Roses',
          id: 4,
          skill: {value: 1, defaultTitle: 'Beginner'},
        });
      });
  });

  test('GET /songs -> returns empty array if user has no songs', () => {
    const newToken = createJWT({
      id: 4,
      username: 'ava',
    } as User);

    request(app)
      .get('/api/songs')
      .set('Authorization', 'bearer ' + newToken)
      .expect(200)
      .then((res) => {
        expect(res.body.data.songs.length).toBe(0);
      });
  });

  test('POST /songs -> creates new songs', () => {
    request(app)
      .post('/api/songs')
      .send({songName: 'Sound of Silence', artist: 'Simon and Garfunkel', skillLevel: 3})
      .set('Authorization', 'bearer ' + token)
      .set('Accept', 'application/json')
      .expect(201)
      .then((res) => {
        expect(res.body.data.song).toMatchObject({
          songName: 'Sound of Silence',
          artist: 'Simon and Garfunkel',
          id: 6,
          skill: {value: 3, defaultTitle: 'Advanced'},
        });
      });
  });
});
