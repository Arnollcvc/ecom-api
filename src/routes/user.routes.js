import { Router } from "express";
const r = Router();
import Ctrl from "../controller/user.c.js";
import { verifyToken, isAdmin, isInvalidToken } from "../middleware/auth.js"; 

r.get("/", [verifyToken, isInvalidToken, isAdmin], Ctrl.getUsers);
r.post("/singup", Ctrl.singup);
r.post("/login", Ctrl.login);
r.post("/logout", Ctrl.logout);

export default r;