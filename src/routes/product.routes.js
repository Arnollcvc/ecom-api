import { Router } from "express";
const r = Router();
import Ctrl from "../controller/product.c.js";
import { verifyToken, isAdmin, isMod } from "../middleware/auth.js"; 

r.get("/", Ctrl.getProducts);
r.get("/:id", Ctrl.getProduct);
r.post("/", [verifyToken, isAdmin], Ctrl.createProduct);
r.delete("/:id",[verifyToken, isAdmin], Ctrl.deleteProduct);
r.put("/:id", [verifyToken, isMod], Ctrl.updateProduct);

export default r;