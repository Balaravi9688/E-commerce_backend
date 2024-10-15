import jwt from "jsonwebtoken";
import constants from "../constants/constants.js";

const generateJWT = (data) => {
  let token = jwt.sign(data, constants.jwtSecret, { expiresIn: '120m' });
  return token;
};

export { generateJWT };
