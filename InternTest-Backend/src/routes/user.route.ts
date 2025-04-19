import express from "express"
import handlelogin from "../controllers/user.login.js"
import handlesignup from "../controllers/user.signup.js"
import handlelogout from "../controllers/user.logout.js"

const userRouter = express.Router();

userRouter.post('/login', handlelogin );
userRouter.post('/signup', handlesignup);
userRouter.get('/logout', handlelogout);

export default userRouter


