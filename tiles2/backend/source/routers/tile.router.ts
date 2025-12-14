import express, { Request, Response } from "express";
import { tileService } from "../services/tile.service";
import { userService } from "../services/user.service";
import { baseJson } from "../BaseJsons";
import { middleWare } from "./user.router";

export const router = express.Router();

router.get("/all",middleWare('viewer' , 'moderator' , 'editor' , 'admin'), async (req: Request, res: Response) => {
  try {
    const myTiles = await tileService.getAllTiles();
    console.log(myTiles);
    res.status(200).json(myTiles);
    return;
  } catch (err) {
    res.status(404).json({ message: "bad token" });
    return;
  }
});

router.get("/tileById/:id",middleWare('admin' , 'moderator' , 'editor' , 'viewer'), async (req: Request, res: Response) => {
  try {
    if (!baseJson.baseUserSchemaGetOne(req.params.id)) {
      res.status(404).json({ message: "bad" });
      return;
    }    
      const id = req.params.id;
      const myTile = await tileService.getTileById(id);
      res.status(200).json(myTile);
      return;
    
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});

router.post("/tile",middleWare('moderator' , 'admin'), async (req: Request, res: Response) => {
  try {
    if (!baseJson.baseTileSchemaPost(req.body)) {
      res.status(404).json({ message: "bad" });
      return;
    }
   
    const color = req.body["color"];
    const createdAt = req.body["createdAt"];
    const updatedAt = req.body["updatedAt"];

    const id = await tileService.createTile(color, createdAt, updatedAt);
    if (id == null) {
      res.status(404).json({ error: "not such id" });
      return;
    }
    res.status(200).json({ id: id });
    return;
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});

router.post("/tile:id", middleWare('admin' , 'moderator'),async (req: Request, res: Response) => {
  try {
    if (!baseJson.baseTileSchemaGetOne(req.body)) {
      res.status(404).json({ message: "bad" });
      return;
    }
    
    const id = req.params.id;
    await tileService.updateTile(id, req.body);
    res.status(200).json({ id: id });
    return;
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});

router.delete("/tile:id", middleWare('admin' , 'moderator'), async (req: Request, res: Response) => {
  try {
    if (!baseJson.baseTileSchemaDelete(req.params.id)) {
      res.status(404).json({ message: "bad" });
      return;
    }
   
    const id = req.params.id;
    await tileService.deleteTile(id);
    res.status(200).json({ "tile deleted id": id });
    return;
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});

router.post("/saveAll",middleWare('admin' , 'moderator' , 'editor') , async (req: Request, res: Response) => {
  try {
    if (!baseJson.baseTileSchemaSaveAll(req.body)) {
      res.status(404).json({ message: "bad" });
      return;
    }
    
    const all = req.body;
    await tileService.insertAll(all);
    res.status(200).json({ message: "allInserted" });
    return;
  } catch (err) {
    res.status(404).json({ error: err });
    return;
  }
});
