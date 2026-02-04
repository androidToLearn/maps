import express, { Request, Response } from "express";
import { userService } from "../services/user.service";
export const router = express.Router();
import { baseJson } from "../BaseJsons";
import { NextFunction } from "express";

export function middleWare(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.idUser !== undefined) {
      const user = await userService.getUserById(req.idUser["insertedId"]);
      if (user === null) {
        res.status(404).json({ message: "bad token" });
        return;
      }

      if (user && roles.includes(user["role"])) {
        next();
      } else {
        res.status(404).json({ message: "bad role" });
        return;
      }
    }
  };
}
router.get(
  "/allUsers",
  middleWare("admin"),
  async (req: Request, res: Response) => {
    try {
      const myUsers = await userService.getAllUsers();
      const userWithoutPassword = [];
      for (const index in myUsers) {
        const user = myUsers[index];
        userWithoutPassword.push({
          _id: user["_id"],
          name: user["name"],
          email: user["email"],
          role: user["role"],
          password: user["password"],
        });
      }
      res.status(200).json(userWithoutPassword);
      return;
    } catch (err) {
      res.status(404).json({ error: err });
      return;
    }
  },
);

router.get(
  "/userById",
  middleWare("admin", "moderator", "viewer", "editor"),
  async (req: Request, res: Response) => {
    try {
      if (req.idUser !== undefined) {
        if (!baseJson.baseUserSchemaGetOne(req.idUser["insertedId"])) {
          res.status(404).json({ message: "bad" });
          return;
        }
        const user = await userService.getUserById(req.idUser["insertedId"]);

        res.status(200).json(user);
        return;
      }
    } catch (err) {
      res.status(404).json({ message: "bad" });
      return;
    }
  },
);

router.post(
  "/user",
  middleWare("admin"),
  async (req: Request, res: Response) => {
    try {
      if (!baseJson.baseUserSchemaPost(req.body)) {
        res.status(404).json({ message: "bad" });
        return;
      }

      const id = await userService.insertUser(
        req.body["name"],
        req.body["email"],
        req.body["password"],
        req.body["role"],
      );
      if (id == null) {
        res.status(404).json({ error: "not such id" });
        return;
      }
      res.status(200).json({ "tile inserted id": id });
      return;
    } catch (err) {
      res.status(404).json({ error: err });
      return;
    }
  },
);

router.delete(
  "/user",
  middleWare("admin"),
  async (req: Request, res: Response) => {
    try {
      if (req.idUser !== undefined) {
        if (!baseJson.baseUserSchemaDelete(req.idUser["insertedId"])) {
          res.status(404).json({ message: "bad" });
          return;
        }
        const id = req.idUser["insertedId"];
        await userService.deleteUserById(id);
        res.status(200).json({ id: id });
        return;
      }
    } catch (err) {
      res.status(404).json({ error: err });
      return;
    }
  },
);

router.post(
  "/insertAll",
  middleWare("admin"),
  async (req: Request, res: Response) => {
    try {
      if (!baseJson.baseUserSchemaSaveAll(req.body["users"])) {
        res.status(404).json({ message: "bad" });
        return;
      }
      await userService.deleteAll();
      for (const i in req.body["users"]) {
        const oneUser = req.body["users"][i];

        if (oneUser["id"] === req.idUser) {
          await userService.insertUserWithId(
            oneUser["id"],
            oneUser["name"],
            oneUser["email"],
            oneUser["password"],
            oneUser["role"],
          );
        } else {
          await userService.insertUser(
            oneUser["name"],
            oneUser["email"],
            oneUser["password"],
            oneUser["role"],
          );
        }
      }

      res.status(200).json({ message: "all saved" });
    } catch (err) {
      res.status(403).json({ message: err });
    }
  },
);
