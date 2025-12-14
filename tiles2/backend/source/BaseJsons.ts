import { UserSchemaTypeSignIn } from "./typescript";
import { UserSchemaTypeRegister } from "./typescript";
import { TileSchemaTypeOneTile } from "./typescript";
import { TileSchemaTypeDelete } from "./typescript";
import { TileSchemaTypeSaveAll } from "./typescript";

import { UserSchemaTypeOneTile } from "./typescript";
import { UserSchemaTypeDelete } from "./typescript";
import { UserSchemaTypeSaveAll } from "./typescript";
import { TileSchemaTypePost, UserSchemaTypePost } from "./typescript";

class BaseJson {
  baseUserSchemaSignIn(json: UserSchemaTypeSignIn) {
    //{ email: 'yishay@gmail.com', password: '1@eZz12345' }
    if (json !== null) {
      if (
        json.email !== undefined &&
        json.password !== undefined &&
        Object.keys(json).length === 2
      )
        return true;
    }
    return false;
  }

  baseUserSchemaRegister(json: UserSchemaTypeRegister) {
    if (json !== null) {
      if (
        json.email !== undefined &&
        json.password !== undefined &&
        json.name !== undefined &&
        json.role !== undefined &&
        Object.keys(json).length === 4
      )
        return true;
    }
    return false;
  }

  baseTileSchemaDelete(id: string) {
    if (typeof id === "string") return true;
    return false;
  }

  baseTileSchemaSaveAll(json: TileSchemaTypeSaveAll) {
    if (!json) {
      return false;
    }
    if (json.length > 0) {
      if (
        json[0]._id !== undefined &&
        json[0].color !== undefined &&
        json[0].createdAt !== undefined &&
        json[0].updatedAt !== undefined
      ) {
        return true;
      }
    }
    return true;
  }

  baseTileSchemaPost(json: TileSchemaTypePost) {
    return true;
  }

  baseUserSchemaOneTile(json: UserSchemaTypeOneTile) {
    return true;
  }

  baseUserSchemaDelete(id: string) {
    if (typeof id === "string") {
      return true;
    }
    return false;
  }

  baseUserSchemaSaveAll(json: UserSchemaTypeSaveAll) {
    if (
      json !== null &&
      json.length > 0 &&
      json[0].id !== undefined &&
      json[0].email !== undefined &&
      json[0].password !== undefined &&
      json[0].role !== undefined
    )
      return true;
    return false;
  }

  baseUserSchemaGetOne(id: string) {
    if (typeof id === "string") {
      return true;
    }
    return false;
  }

  baseUserSchemaPost(json: UserSchemaTypePost) {
    /*{
  email: 'HDGF@gmail.com',
  password: 'DFFD4334GFdfdDF#FD32',
  name: 'FJHG',
  role: 'viewer'
} */
    if (json !== null) {
      if (
        json.email !== undefined &&
        json.password !== undefined &&
        json.name !== undefined &&
        json.role !== undefined &&
        Object.keys(json).length === 4
      )
        return true;
    }
    return false;
  }

  baseTileSchemaGetOne(id: string) {
    if (typeof id === "string") {
      return true;
    }
    return false;
  }
}

export const baseJson = new BaseJson();
