import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(process.env.PORT || 3333, () =>
  console.log("Server start on http://localhost:" + process.env.PORT)
);
