import Role from "../models/Role.js";
import User from "../models/User.js";
import { Schema } from 'mongoose';
//esto crea los roles para los usuarios, solo se ejecutará solo una vez en todo el proyecto.
export const createDefaultRoles = async () => {
  let count = await Role.estimatedDocumentCount();
  if (count > 0) return;
  const r = await Promise.all([
    new Role({ name: "user" }).save(),
    new Role({ name: "mod" }).save(),
    new Role({ name: "admin" }).save(),
  ]);
  console.log("Roles creados con exito!\n", r);
}
