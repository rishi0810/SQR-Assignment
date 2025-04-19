import prisma from "../db/prisma.js";
import { cmppw } from "../util/pw.hash.js";
import { createtoken } from "../util/jwttoken.js";
import { Request,Response} from "express";
import { User } from "../generated/prisma/index.js";

const handlelogin = async (req : Request, res : Response) : Promise<void> => {
    try {
      const { email , password } = req.body;
      const existing : User | null = await prisma.user.findUnique({ where : {email: email }});
      if (!existing){
         res.status(404).json({ message: "User does not exist" });
         return;
      }
      const isMatch = await cmppw(password, existing.password);
      if (!isMatch){
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
         
        const token = createtoken(existing);
  
       res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({
          message: "Login Successful",
          email: existing.email,
          createdAt: existing.createdAt,
          id: existing.id,
        });
    } catch (err) {
       res.status(500).json({ message: `Server Error + ${err}` });
    }
  };

export default handlelogin