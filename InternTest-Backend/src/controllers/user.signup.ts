import prisma from "../db/prisma.js";
import { hashpw } from "../util/pw.hash.js";
import { Request,Response, } from "express";
import { User } from "../generated/prisma/index.js";
const handlesignup = async (req : Request, res : Response) : Promise<void> => {
    try {
      const { email, password } = req.body;
      if(!email || !password) { 
        res.status(400).json({message : "Invalid information"})
        return
      }

      const existing : User | null = await prisma.user.findUnique({ where :{email: email }});
  
      if (existing){
        res.status(409).json({ message: "user already exists" });
        return
      }
        
  
      const hashedpassword = await hashpw(password);
      const newUser : User = await prisma.user.create({
        data: { email: email, password: hashedpassword},
      });
  
       res.status(201).json({ message: "User has been created", user: newUser });
    } catch (err) {
       res.status(500).json({ message: `Error : ${err}` });
    }
  };

export default handlesignup