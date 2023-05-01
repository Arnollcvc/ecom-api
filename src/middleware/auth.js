import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/api.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers[`${config.HEADER_API_TOKEN_NAME}`];
    if (!token) return res.status(401).json({ message: "token no proveida" });
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "token invalido" });
    next();
  } catch (e) {
    // console.log(e.stack);
    return res.status(400).json({ message: "token invalido" });
  }
}

export const isInvalidToken = async (req, res, next) => {
  try {
    const token = await User.findOne({ invalidTokens: req.headers[`${config.HEADER_API_TOKEN_NAME}`] });
    if (token) return res.status(401).json({ message: "token invalidado" });
    next();
  } catch (e) {
    // console.log(e.stack);
    return res.status(400).json({ message: "token invalido" });
  }
}

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers[`${config.HEADER_API_TOKEN_NAME}`];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "token invalido" });
    if (decoded?.isAdmin) return next();
    return res.status(401).json({ message: "no tienes permiso" });
  } catch (e) {
    // console.log(e.stack);
    return res.status(400).json({ message: "token invalido" });
  }
}

export const isMod = (req, res, next) => {
  try {
    const token = req.headers[`${config.HEADER_API_TOKEN_NAME}`];
    const decode = jwt.verify(token, config.JWT_SECRET);
    if (!decode) return res.status(401).json({ message: `token invalido` });
    if (decode?.isMod || decode?.isAdmin) return next();
    return res.status(401).json({ message: `no tienes permiso` });
  } catch (e) {
    // console.log(e.stack);
    return res.status(401).json({ message: `token invalido` });
  }
}

