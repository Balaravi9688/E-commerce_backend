import dotenv from "dotenv";

dotenv.config();

const constants = {
  jwtSecret: process.env.JWT_SECRET || 'ecommerceJwt',
};

export default constants;
