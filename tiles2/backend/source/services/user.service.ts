import { myClient } from "./db_utils";
import { IntegerType, ObjectId } from "mongodb";

class UserService {
  async insertUser(
    name: string,
    email: string,
    password: string,
    role: IntegerType
  ) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    const id = await collection.insertOne({
      id: ObjectId,
      name: name,
      email: email,
      password: password,
      role: role,
    });
    return id;
  }

  async getUserById(id: string) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    const query = { _id: new ObjectId(id)};
    
    const myUser = await collection.find(query).toArray();
    return myUser[0];
  }

  async updateUserById(
    id: string,
    name: string,
    email: string,
    password: string,
    role: IntegerType
  ) {
    const myUser = await this.getUserById(id);
    if (myUser === null) {
      return null;
    }

    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: name, email: email, password: password, role: role } }
    );
  }

  async deleteUserById(id: string) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    await collection.deleteOne({ _id: new ObjectId(id) });
  }

  async getAllUsers() {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    const myUsers = await collection.find().toArray();

    return myUsers;
  }

  async deleteAll() {
    const client = myClient;
    const db = client.db("rachdata");
    const collection = db.collection("users");
    await collection.deleteMany({});
  }

  async insertUserWithId(
    myIdToInsert: string,
    name: string,
    email: string,
    password: string,
    role: IntegerType
  ) {
    const client = myClient;

    const db = client.db("rachdata");
    const collection = db.collection("users");
    const id = await collection.insertOne({
      _id: new ObjectId(myIdToInsert),
      name: name,
      email: email,
      password: password,
      role: role,
    });
    return id;
  }
}

export const userService = new UserService();
