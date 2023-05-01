import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createDefaultRoles } from "./utils/setup.js";
import User from "./routes/user.routes.js";
import Product from "./routes/product.routes.js";
import Main from "./routes/main.routes.js";

const app = express();
const limiter = rateLimit({
  standardHeaders: false,
  legacyHeaders: false,
  max: 100,
  windowMs: 60 * 60 * 1000,
  handler: (req, res) => res.status(429).json({ message: "Demasiadas peticiones intente más tarde" })
});

createDefaultRoles();

app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) return res.status(400).json({ message: 'Error al analizar el cuerpo de la solicitud' });
  next();
});

app.use("/", Main);
app.use("/auth", User);
app.use("/products", Product);
app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

export default app;