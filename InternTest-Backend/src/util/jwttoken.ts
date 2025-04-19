import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import dotenv from "dotenv";
import { User } from "../generated/prisma/index.js";

dotenv.config();

const secret = process.env.JWT_SECRET as string

const createtoken = (user : User) => {
  const { id, email } = user;
  const payload = { 
    _id: id,
    email: email,
  };
  const token = sign(payload, secret);
  return token; 
};

const validatetoken = async (token : string) => {
  const payload = verify(token, secret);
  return payload;
};

export { createtoken, validatetoken };
