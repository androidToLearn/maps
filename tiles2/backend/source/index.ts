import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");

import { router as loginRouter } from "./routers/login.router";
import { router as userRouter } from "./routers/user.router";
import { router as tileRouter } from "./routers/tile.router";

import { getClient } from "../source/services/db_utils";
import { SECRET } from "../source/services/db_utils";
import { typeIdUserDict } from "./typescript";


dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    idUser?: typeIdUserDict;
  }
}

const port = process.env.PORT || 8000;

const app: Express = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    res.sendStatus(403).json({ message: "bad token" });
    return;
  }


  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401).json({ message: "bad", error: "bad token" });
    return;
  }

  let id = await jwt.verify(token, SECRET, (err: Error, id: string) => {
    if (err) {
      res.sendStatus(403).json({ message: "bad", error: err });
      return null;
    }
    return id;
  });

  req.idUser = id['userId'];
  if (req.idUser !== undefined && req.idUser['insertedId'] !== undefined)
  {
    req.idUser['insertedId'] = req.idUser['insertedId']
  }
  next();
}

app.use("/tile", authenticate, tileRouter);
app.use("/user", authenticate, userRouter);
app.use("/login", loginRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "connected to the server on port " + port });
  return;
});

app.listen(port, () => {
  try {
    getClient();
    //tileService.createTile('red' , new Date() , new Date())
  } catch (err) {
  }
});
