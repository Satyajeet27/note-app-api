import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT,
  uri: process.env.MONGODB_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};
export default Object.freeze(config);
