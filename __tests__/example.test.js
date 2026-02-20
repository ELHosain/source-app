const request = require("supertest");
const app = require("../src/index");

describe("API tests", () => {

  test("GET / should return hello", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  test("POST /sum should return result", async () => {
    const res = await request(app)
      .post("/sum")
      .send({ a: 2, b: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test("POST /sum invalid input", async () => {
    const res = await request(app)
      .post("/sum")
      .send({ a: "x", b: 3 });

    expect(res.statusCode).toBe(400);
  });

});