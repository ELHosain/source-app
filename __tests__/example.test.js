// __tests__/example.test.js
const request = require("supertest");
const portfinder = require("portfinder");

const app = require("../src/index");

let server;
let port;

beforeAll(async () => {
  port = await portfinder.getPortPromise();

  // Ici app DOIT être une instance express (sinon undefined)
  server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});

afterAll(async () => {
  if (!server) return;

  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe("GET /", () => {
  test("should return Hello World", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World");
  });
});

describe("POST /sum", () => {
  test("should return the sum of two numbers", async () => {
    const res = await request(server)
      .post("/sum")
      .send({ a: 10, b: 20 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 30 });
  });

  test("should return 400 for invalid input", async () => {
    const res = await request(server)
      .post("/sum")
      .send({ a: "10", b: 20 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});