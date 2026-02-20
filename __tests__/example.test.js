import request from 'supertest';
import portfinder from 'portfinder';
import { app } from '../src/index.js';

let server;
let port;

beforeAll(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello World!');
  });
});

describe('POST /sum', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: 1, b: 3 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', 3);
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: 1, b: 'two' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Invalid input');
  });
});
