import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/test',
  JWT_SECRET: process.env.JWT_SECRET || 'codigoultrasecretoxdd',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  ULTRA_MASTER_SECRET_KEY: process.env.ULTRA_MASTER_SECRET_KEY || 'otrocodigoultrasecretoxdxd',
  HEADER_API_TOKEN_NAME: "x-access-token"
}