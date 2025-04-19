import express from "express";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


app.use(express.json());
app.use(cookieParser());
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Set-Cookie"
  );
  next();
});
app.use(cors(corsOptions));

app.use('/user', userRouter);

app.get('/', (req: Request, res: Response): any => {
  return res.status(200).json({ message: "IntelliSQR auth form" });
});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
