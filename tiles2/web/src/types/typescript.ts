import { colorsEnumWithoutAdd } from './../services/Enum';
import type { SubmitHandler } from "react-hook-form";
import type { colorsEnum, colorsEnumWithoutAdd } from "../services/Enum";
export type user_type = {
  id: string;

  name: string;

  email: string;

  password: string;

  role: number;
};

export type tile_type = {
  id: string;

  color: string;

  createdAt: Date;

  updatedAt: Date;
};

export type typeHistoryUser = typeDictUser[][];

export type typeDictUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type typeActions = {
  action: string;
  id: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  index: number;
};

export type valueExport = {
  setInSign: (value: boolean) => void;
  doSomethingMethod: SubmitHandler<Inputs>;
  setTexts: (value: string[]) => void;
  texts: string[];
};

export type Inputs = {
  password: string;
  name: string;
  email: string;
};
export type InputsSignIn = {
  password: string;
  email: string;
};

export type BottomLineDictTypes = {
  setIsToDoLoader: (value: boolean) => void;
  profile: string;
  setHasChanges: (value: boolean) => void;
  allHistory: {
    color: colorsEnum | colorsEnumWithoutAdd;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  hasChanges: boolean;
  token: string;
  setAllHistory: (
    value: { color: colorsEnum | colorsEnumWithoutAdd; id: string; createdAt: Date; updatedAt: Date }[][],
  ) => void;
  isSuccess: (value: boolean) => void;
};

export type UpLineType = {
  dict: UpLineDictTypes;
};

export type UpLineDictTypes = {
  name: string;
  profile: string;
  navigate: Navigator;
  isAdminPage: boolean;
};

export type BottomLineAdminType = {
  dict: BottomLineAdminDictTypes;
};

export type TypePostSomething =
  | {
      body:
        | {
            id: string;
            name: string;
            email: string;
            password: string;
            role: string;
          }[]
        | { color: string; id: string; createdAt: Date; updatedAt: Date }[];
    }
  | {
      users: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
      }[];
      myId: string;
    }
  | typeTile[];

export type TypeContentAdminToSave = {
  toSave: TypeUsersToSave;
  arrayIdsToUpdate: string[] | undefined;
  idUser: string;
  myId: string;
};

export type BottomLineAdminDictTypes = {
  isAbleClickUndo: boolean;
  setIsAbleClickUndo: (value: boolean) => void;
  token: string | null;
  idUser: string | null;
  allHistory: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }[][];
  isChanged: boolean;
  setAllHistory: (
    value: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
  ) => void;
  setIsChanged: (value: boolean) => void;
  setIsSuccess: (value: boolean) => void;
  arraysIdsToUpdate: string[] | undefined;
};

export type typeUser = {
  user: dictTypeUser;
};

export type dictTypeUser = {
  name: string;
  profile: string;
};

export type TypeOneTile = {
  properties: TypeOneTileDict;
  index: number;
  color: string;
};

export type TypeUsersToSave = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}[];

export type typeUserToSave = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type typeOneTile = {
  color: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TypeOneTileDict = {
  hasChanges: boolean;
  allArichim: { color: colorsEnum | colorsEnumWithoutAdd; id: string; createdAt: Date; updatedAt: Date }[];
  allHistory: {
    color: colorsEnum | colorsEnumWithoutAdd;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  setAllHistory: (
    value: { color: colorsEnum | colorsEnumWithoutAdd; id: string; createdAt: Date; updatedAt: Date }[][],
  ) => void;
  setHasChanges: (value: boolean) => void;
  profile: string;
  index: number;
  color: colorsEnum | colorsEnumWithoutAdd;
};

export type filterType = {
  dict: filterDictType;
};

export type filterDictType = {
  filter: number;
  setFilter: (value: number) => void;
};

export type TypeAllTilesComponent = {
  properties: TypeAllTilesDict;
};

export type TypeAllTilesDict = {
  profile: string;
  allArichim: { color: colorsEnum | colorsEnumWithoutAdd; id: string; createdAt: Date; updatedAt: Date }[];
  hasChanges: boolean;
  allHistory: {
    color: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  setAllHistory: (
    value: { color: string; id: string; createdAt: Date; updatedAt: Date }[][],
  ) => void;
  setHasChanges: (value: boolean) => void;
};

export type TypeRowUser = {
  allUsers: TypeUsersToSave;
  isChanged: boolean;
  allHistory: typeHistoryUser;
  setIsChanged: (value: boolean) => void;
  setAllHistory: (value: typeHistoryUser) => void;
  myIdUser: string;
  arrayIdsToUpdate: string[] | undefined;
  setArrayIds: (value: string[]) => void;
  index: number;
  user: typeDictUser;
};

export type TypeUpLineDict = {
  name: string;
  profile: string;
  setIsInAdmin: (value: boolean) => void;
  isInAdmin: boolean;
};

export type TypeAllTilesProperties = {
  profile: string;
  hasChanges: boolean;
  allHistory: {
    color: colorsEnumWithoutAdd | colorsEnum;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  setAllHistory: (
    value: { color: colorsEnum | colorsEnumWithoutAdd; id: string; createdAt: Date; updatedAt: Date }[][],
  ) => void;
  setHasChanges: (value: boolean) => void;
  allArichim: {
    color: colorsEnumWithoutAdd | colorsEnum;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type typeTile = {
  color: colorsEnumWithoutAdd | colorsEnum;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type isSuccessType = {
  setIsSuccess: (value: boolean) => void;
};

export type TypeInsideMutationSave = {
  setIsSuccess: (value: boolean) => void;
  toSave: TypeUsersToSave;
  arrayIdsToUpdate: string[] | undefined;
  idUser: string;
};

export type typeMutationSaveTiles = {
  token: string;
  toSave: typeTile[];
  isSuccess: (value: boolean) => void;
};

export type typeRegisterMutate = {
  email: string;
  name: string;
  password: string;
  setMessage: (value: string) => void;
};
export type typeDataRegister = {
  accessToken: string;
  message: string;
};

export type typeSignIn = {
  email: string;
  password: string;
  setMessage: (value: string) => void;
};

export type typeUserMutation = {
  data: typedata;
  dictValues: dictValuesUserInsert;
};

export type typeWithMode = {
  mode: string;
};

export type typedata = {
  id: string;
  insertedId: string | undefined;
};

export type dictValuesUserInsert = {
  setName: (value: string) => void;
  setProfile: (value: string) => void;
  setIdUser: (value: string) => void;
};

export type typeNothing = {};

export type typeDataUser = {
  name: string;
  role: string;
  _id: string;
};

export type typeDictForChangesAllTiles = {
  allHistory: typeTile[][];
  setAllHistory: (value: typeTile[][]) => void;
  setIsToDoLoader: (value: boolean) => void;
};

export type typeAllPropertiesToShowUsers = {
  allHistory: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }[][];
  setAllHistory: (
    value: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
  ) => void;
  setIsAbleClickUndo: (value: boolean) => void;
};

export type typePRopertiesOneUserFromServer = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}[];

export type typeISuccessDict = {
  isSuccess: (value: boolean) => void;
};

export type typePostAllTiles = { toSave: TypePostSomething };

export type typeDictContext = {
  profile: string;
  setProfile: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  idUser: string;
  setIsAdminPage: (value: boolean) => void;
  isAdminPage: boolean;
};

export type typeSignInDict = {
  email: string;
  password: string;
  setMessage: (value: string) => void;
};

export type dictMessageAndAccessToken = {
  accessToken: string;
  message: string;
  setMessage: (value: string) => void;
};

export type typeEnum =
  | colorsEnum.color1
  | colorsEnum.color2
  | colorsEnum.color3
  | colorsEnum.color4
  | "add";
