import app from './app.js';
import { connectDB } from './utils/Mdb.js';
import config  from "./config/api.js";

const RUN = async () => {
  await connectDB();
  app.listen(config.PORT, () => console.log("Server connected", config.PORT));
}
RUN();

export default app;