import { ObjectId } from "mongodb";
export type user = {
  id: ObjectId;

  name: string;

  email: string;

  password: string;

  role: string;
};

export type tile = {
  id: ObjectId;

  color: string;

  createdAt: Date;

  updatedAt: Date;
};

export type UserSchemaTypeSignIn = {
  email : string , 
  password : string
};
export type UserSchemaTypeRegister = {
  email: string,
  password: string,
  name: string,
  role: string
};

export type typeIdUserDict = 
  {insertedId : string}
 | undefined

export type TileSchemaTypeSaveAll = { _id: ObjectId,
    id: ObjectId,
    color: string,
    createdAt: string,
    updatedAt: string}[];

export type UserSchemaTypeSaveAll = {
    id: string,
      name:string,
      email: string,
      password: string,
      role: string
}[];


export type UserSchemaTypePost = {
  /*{
  email: 'HDGF@gmail.com',
  password: 'DFFD4334GFdfdDF#FD32',
  name: 'FJHG',
  role: 'viewer'
} */
email :string , 
password : string , 
name : string , 
role : string
}





