import e from 'express';
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

describe('/user', () => {
  test('GET /user -> returns user', () => {
    request(app)
      .get('/api/user')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .then((res) => {
        expect(res.body.data.user).toMatchObject({username: 'nathan', id: 3});
      });
  });

  test('GET /user -> returns 404 if no user', (done) => {
    const tempToken = createJWT({
      id: 99,
      username: 'not_a_user',
    } as User);

    request(app)
      .get('/api/user')
      .set('Authorization', 'bearer ' + tempToken)
      .expect(404, done);
  });

  test('POST /user/signup -> signs up user', (done) => {
    request(app)
      .post('/api/user/signup')
      .send({username: 'tester', password: 'password'})
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('POST /user/signup -> returns 409 if user exists', async (done) => {
    await request(app)
      .post('/api/user/signup')
      .send({username: 'tester', password: 'password'})
      .set('Accept', 'application/json');

    request(app)
      .post('/api/user/signup')
      .send({username: 'tester', password: 'password'})
      .set('Accept', 'application/json')
      .expect(409, done);
  });

  test('POST /user/login -> logs in user', async (done) => {
    try {
      const res = await request(app)
        .post('/api/user/login')
        .send({username: 'nathan', password: 'password'})
        .set('Accept', 'application/json')
        .expect(200);
      expect(res.body.data.user).toMatchObject({username: 'nathan', id: 3});
      done();
    } catch (err) {
      done(err);
    }
  });

  test('POST /user/login -> returns 401 on failed authentication', (done) => {
    request(app)
      .post('/api/user/login')
      .send({username: 'random', password: 'random'})
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  test('DELETE /user/:id -> deletes user', () => {
    request(app)
      .delete('/api/user/3')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .then((res) => {
        expect(res.body.data.message).toBe('User deleted');
      });
  });

  test("DELETE /user/:id -> should not delete if user ids don't match", (done) => {
    const tempToken = createJWT({
      id: 1,
      username: 'thafner',
    } as User);

    request(app)
      .delete('/api/user/3')
      .set('Authorization', 'bearer ' + tempToken)
      .expect(401, done);
  });
});
