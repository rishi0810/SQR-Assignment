import { Request,Response } from "express";
const handlelogout = async (req : Request, res : Response) : Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Not Logged In" })
    return
  } 
    
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
  
       res.status(200).json({ message: "Logout successful" });
       return
    } catch (err) {
      res.status(400).json({ message: "Logout failed" });
      return
    }
  };

export default handlelogout