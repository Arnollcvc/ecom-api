import req from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/utils/Mdb.js";
connectDB();

describe("POST /products", () => {
  it("retorna un mensaje de error si el token no es proveida", (done) => {
    req(app).post("/products")
    .set("Accept", "application/json")
    .expect(401).then(res => {
      expect(res.body).toEqual({
        "message": "token no proveida"
      });
      done();
    });
  });
});

describe("POST /products con token invalidado o invalido", () => {
  it("retorna un mensaje de error si el token es invalido", (done) => {
    req(app).post("/products")
    .set("Accept", "application/json")
    .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzgwMjg0NjEwZjQ4NjI3YzEs0Y2")
    .expect(400).then(res => {
      expect(res.body).toEqual({
        "message": "token invalido"
      });
      done();
    });
  });
});

describe("POST /products con token valido pero sin parámetros para crear el producto", () => {
  it("retorna un mensaje de que faltan datos para crear el producto", (done) => {
    req(app).post("/products")
    .set("Accept", "application/json")
    .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGQ0NTk3YzA2OWZlNzVkYjQ1Zjc1YiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Mjk2NTQyNSwiZXhwIjoxNjg1NTU3NDI1fQ.JnR5F1YVnnn6fXQA42SuQIMi-y-V0EqvPDLqK8INjYM")
    .expect(400).then(res => {
      expect(res.body).toEqual({
        "message": "Faltan datos"
      });
      done();
    });
  });
});

describe("POST /products", () => {
  it("retorna un mensaje de que el producto ha sido creado", (done) => {
    req(app).post("/products")
    .set("Accept", "application/json")
    .set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGQ0NTk3YzA2OWZlNzVkYjQ1Zjc1YiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Mjk2NTQyNSwiZXhwIjoxNjg1NTU3NDI1fQ.JnR5F1YVnnn6fXQA42SuQIMi-y-V0EqvPDLqK8INjYM")
    .send({
      "name": "test",
      "description": "esto es un test",
      "price": 1450,
      "category": "test",
      "stock": 83,
      "img": "test",
      "images": ["test"]
    })
    .expect(200).then(res => {
      expect(res.body).toEqual({
        "message": "Producto creado!"
      });
      done();
    });
  });
});