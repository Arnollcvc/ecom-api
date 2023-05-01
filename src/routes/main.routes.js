import { Router } from "express";
const r = Router();

r.get("/", (req, res) => res.json({ hola: "mundo" }));

export default r;