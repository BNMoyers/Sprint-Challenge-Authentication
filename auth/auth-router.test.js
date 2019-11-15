const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("authRouter", function() {
  describe("POST /register", function() {
    
    it("should return 201 status", function() {
      beforeEach(async () => { 
        await db("users").truncate();
      });
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "jester",
          password: "sapphire"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return JSON formatted response", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "jester",
          password: "sapphire"
        })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
   describe("POST /login", function() {
    it("should return 201 status", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "jester",
          password: "sapphire"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return JSON formatted response", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "jester",
          password: "sapphire"
        })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});

