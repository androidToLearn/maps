import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

export let myClient = new MongoClient(process.env.API_KEY + "") ;

export const SECRET = process.env.TOKEN;

export function getClient() {
  dotenv.config();
  const uri = process.env.API_KEY || "mongodb://";

  myClient = new MongoClient(uri);
  myClient.connect();
  return myClient;
}

export function closeConnecting() {
  myClient.close();
}
