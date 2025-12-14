import { myClient } from "./db_utils";
import { ObjectId } from "mongodb";
import { tile } from "../typescript";

class TileService {
  async getAllTiles() {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");
    const tiles = await collection.find().toArray();
    console.log(tiles);
    return tiles;
  }

  async getTileById(id: string) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");

    const query = { id: new ObjectId(id) };
    const myTile = await collection.find(query).toArray();
    console.log(myTile);
    return myTile;
  }

  async createTile(color: string, createAt: Date, updatedAt: Date) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");
    console.log("insert tile...");
    const id = await collection.insertOne({
      id: new ObjectId(),
      color: color,
      createdAt: createAt,
      updatedAt: updatedAt,
    });
    return id;
  }

  async deleteTile(id: string) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");
    console.log("delete tile...");
    // await collection.deleteOne({ id: new ObjectId(id) });
    await collection.deleteMany({});
  }

  async updateTile(id: string, myJson: tile) {
    const myTiles = await this.getTileById(id);
    if (myTiles === null) {
      console.log("tile not found");
      return null;
    }

    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");
    console.log("update tile...");
    await collection.updateOne(
      { id: new ObjectId(id) },
      {
        $set: {
          color: myJson["color"],
          createdAt: myJson["createdAt"],
          updatedAt: myJson["updatedAt"],
        },
      }
    );
  }
  async insertAll(
    myJson: { color: string; id: string; createdAt: Date; updatedAt: Date }[]
  ) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("tiles");
    collection.deleteMany({});

    for (const index in myJson) {
      if (myJson[index]["id"] !== "-2") {
        await this.createTile(
          myJson[index]["color"],
          myJson[index]["createdAt"],
          myJson[index]["updatedAt"]
        );
      }
    }
  }

  async deleteAll(
    myJson: { color: string; id: string; createdAt: Date; updatedAt: Date }[]
  ) {
    for (const index in myJson) {
      if (myJson[index]["id"] !== "-1" && myJson[index]["id"] !== "-2") {
        await this.deleteTile(myJson[index]["id"]);
      }
    }
  }
}

export const tileService = new TileService();
