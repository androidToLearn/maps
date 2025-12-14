import express, { Request, Response } from "express";
import { userService } from "../services/user.service";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { authenticate } from "../index";
import { SECRET } from "../services/db_utils";
import { baseJson } from "../BaseJsons";

export const router = express.Router();

router.post("/signIn", async (req: Request, res: Response) => {
  try {
    const json = req.body;
    if (!baseJson.baseUserSchemaSignIn(json)) {
      res.status(404).json({ message: "bad" });
      return;
    }

    const { name, password } = json;
    // const hash = await bcrypt.hash(password, 12);

    //getAll check is appear
    const allUsers = await userService.getAllUsers();
    for (const index in allUsers) {
      const mutch = await bcrypt.compare(password, allUsers[index]["password"]);
      console.log(mutch);
      if (allUsers[index]["email"] === json["email"] && mutch) {
        const token = jwt.sign({ userId: allUsers[index]["_id"] }, SECRET, {
          expiresIn: "30m",
        });
        res.status(200).json({
          message: "exists user",
          accessToken: token,
          id: allUsers[index]["_id"],
        });
        return;
      }
    }
    res.status(200).json({ message: "bad email or password" });
    return;
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    console.log("here0");

    console.log(req.body);
    if (!baseJson.baseUserSchemaRegister(req.body)) {
      res.status(404).json({ message: "bad" });
      return;
    }
    const allUsers = await userService.getAllUsers();
    for (const user in allUsers) {
      if (allUsers[user]["email"] === req.body["email"]) {
        console.log("exists user");
        res.status(200).json({ message: "exists user" });
        return;
      }
    }
    console.log("here1");

    const { password, email, name, role } = req.body;
    console.log("here2");
    const hash = await bcrypt.hash(password, 12);
    const id = await userService.insertUser(name, email, hash, role);
    const token = jwt.sign({ userId: id }, SECRET, {
      expiresIn: "30m",
    });
    console.log("here3");
    res.status(200).json({
      accessToken: token,
      id: id,
    });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

router.get("/protected", authenticate, async (req, res) => {
  try {
    res.status(200).json({ message: "good", id: req.idUser });
  } catch (err) {
    res.status(404).json({ message: "bad" });
  }
});
