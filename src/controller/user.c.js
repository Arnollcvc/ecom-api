import User from "../models/User.js";
import Role from "../models/Role.js";
import Service from "../service/user.s.js";
import { generateToken } from "../service/auth.s.js";
import jwt from "jsonwebtoken";
import config from "../config/api.js";
import { validateEmail } from "../utils/utils.js";

const getUsers = async (req, res) => res.json(await Service.getUsers());

const singup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Faltan parámetros para crear al usuario" });
    if (!validateEmail(email)) return res.status(400).json({ message: "correo invalido" });
    if (await Service.getUser(email)) return res.status(400).json({ message: "correo en uso, utiliza otro" });
    const user = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });
    if (req.body?.roles) {
      let roles = req.body.roles;
      let countRoles = roles.length;
      if (countRoles <= 0) return res.status(400).json({ message: "El usuario debe tener al menos un rol" });
      if (roles.includes("admin") && !req.headers["maste-key-secret-xxx-xxx-xxx"] || roles.includes("mod") && !req.headers[`${config.ULTRA_MASTER_SECRET_KEY}`]) return res.status(401).json({ message: "Sin acceso" });
      let rol = await Role.find({ name: { $in: roles } });
      if (rol.length <= 0) return res.status(400).json({ message: `El rol ${roles[0]} No existe` });
      if (!roles.map((r, i) => rol[i].name !== r ? false : true)) return res.status(401).json({ message: "rol invalido"});

      rol.map(async (r, i) => {
        if (r.name === "admin") {
          let token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: true,
          });
          user.roles = rol.map(r => r._id);
          user.token = token;
          user.isAdmin = true;
          await user.save();
          return res.json({ message: "usuario admin creado con exito!", user: { token } });

        } else if (r.name === "mod") {

          let token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
            isMod: true,
          });
          user.roles = rol.map(r => r._id);
          user.token = token;
          user.isMod = true;
          await user.save();
          return res.json({ message: "usuario mod creado con exito!", user: { token } });
  
        }
      })
      
    } else {

      const rol = await Role.findOne({ name: "user" });
      let token = generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
      });
      user.roles = [rol._id];
      user.token = token;
      await user.save();
      return res.json({ message: "usuario creado con exito", user: { token } });
    }
    
  } catch (e) {
    // console.log(e.stack);
    return res.status(500).json({ message: "Ocurrió un error creando al usuario" });
  }
  
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Faltan parámetros para loguear al usuario" });
    if (!validateEmail(email)) return res.status(400).json({ message: "El correo no es valido" });
    const user = await Service.getUser(email);
    if (!user) return res.status(400).json({ message: "El usuario no existe" });
    if (!await User.comparePassword(password, user.password)) return res.status(400).json({ message: "Contraseña incorrecta" });
    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isMod: user.isMod
    }, config.JWT_SECRET, { expiresIn: `${config.JWT_EXPIRE}` });
    user.invalidTokens.push(user.token);
    user.token = token;
    await user.save();
    return res.json({ message: "usuario logueado con exito!", user: { token } });
  } catch (e) {
    // console.log(e.stack);
    return res.status(500).json({ message: "Ocurrión un error logueando al usuario" });
  }
}

const logout = async (req, res) => {
  try {
    const header_token = req.headers[`${config.HEADER_API_TOKEN_NAME}`];
    if (!req.body?.email || !header_token) return res.status(401).json({ message: "Las credenciales no son validas" });
    const user = await Service.getUser(req.body.email);
    if (!user) return res.status(401).json({ message: "Las credenciales no son validas" });
    const findUserToken = await User.findOne({ token: header_token });
    if (!findUserToken) return res.status(200).json({ message: "Deslogueado!" });
    if (user.token == "") return res.status(400).json({ message: "Deslogueado!" });
    if (user.invalidTokens.includes(user.token)) return res.status(400).json({ message: "Deslogueado!" });
    user.invalidTokens.push(user.token);
    user.token = "";
    await user.save();
    return res.json({ message: "usuario deslogueado con exito!" });
  } catch (e) {
    // console.log(e.stack);
    return res.status(500).json({ message: "Ocurrión un error deslogueando al usuario" });
  }
}

export default {
  getUsers,
  singup,
  login,
  logout,
}