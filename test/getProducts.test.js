import req from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/utils/Mdb.js";
connectDB();

describe("GET /products", () => {
	it("retorna un array con la lista completa de productos", (done) => {
		req(app).get("/products")
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.expect(200, done);
	});
});