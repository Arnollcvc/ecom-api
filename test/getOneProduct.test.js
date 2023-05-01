import req from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/utils/Mdb.js";
connectDB();

describe("GET /products/5c531bce-d83b-43dc-9452-3efa72ba98a1", () => {
	it("retorna un objeto con el producto", (done) => {
		req(app).get("/products/5c531bce-d83b-43dc-9452-3efa72ba98a1")
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.expect(200, done);
	});
});

