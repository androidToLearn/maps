import { colorsEnumWithoutAdd } from "./../services/Enum";
import type { SubmitHandler } from "react-hook-form";
import type { colorsEnum } from "../services/Enum";
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
  profile: string;
  setHasChanges: (value: boolean) => void;
  hasChanges: boolean;
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
        | {
            color: string | colorsEnum | colorsEnumWithoutAdd;
            id: string;
            createdAt: Date;
            updatedAt: Date;
          }[];
    }
  | {
      users: (
        | {
            id: string;
            name: string;
            email: string;
            password: string;
            role: string;
          }
        | typeTileWithString
      )[];
      myId: string;
    }
  | typeTile[]
  | typeTileWithString[]
  | typeDictUser[];

export type TypeContentAdminToSave = {
  toSave: TypeUsersToSave;
  arrayIdsToUpdate: string[] | undefined;
  idUser: string;
  myId: string;
};

export type BottomLineAdminDictTypes = {
  isAbleClickUndo: boolean;
  setIsAbleClickUndo: (value: boolean) => void;
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
  setArrayIdsToUpdate: (value: string[]) => void;
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

export type TypeUsersToSaveMutationSave =
  | {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[]
  | undefined;

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
  allArichim: {
    color: colorsEnum | colorsEnumWithoutAdd | string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  setHasChanges: (value: boolean) => void;
  profile: string;
  index: number;
  color: colorsEnum | colorsEnumWithoutAdd | string;
};

export type typeDataToken = {
  message: string;
  id: string;
  role: string;
  name: string;
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
  allArichim: {
    color: colorsEnum | colorsEnumWithoutAdd | string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  hasChanges: boolean;
  allHistory: allHistoryType;
  setAllHistory: (value: allHistoryType) => void;
  setHasChanges: (value: boolean) => void;
};

export type allHistoryType = {
  color: string | colorsEnum | colorsEnumWithoutAdd;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}[][];

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

export type typeKeeperHistory = {
  setHistory:
    | ((
        value: {
          color: colorsEnum | colorsEnumWithoutAdd | string;
          id: string;
          createdAt: Date;
          updatedAt: Date;
        }[][],
      ) => void)
    | null;
  allHistory:
    | {
        color: colorsEnum | colorsEnumWithoutAdd | string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
      }[][]
    | null;
};
export type TypeAllTilesProperties = {
  profile: string;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
};

export type typeTile = {
  color: colorsEnumWithoutAdd | colorsEnum | string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type typeTileWithString = {
  color: colorsEnumWithoutAdd | colorsEnum | string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type isSuccessType = {
  setIsSuccess: (value: boolean) => void;
};

export type typeFunctionToBeWithMutate = () =>
  | Promise<"bad" | typeDictUser[] | undefined>
  | Promise<typeTileWithString[] | undefined>;

export type typePropertiesBottomLineAdmin = {
  saveFunction: () =>
    | Promise<["bad" | typeDictUser[] | undefined, boolean]>
    | any;
  undoFunction: () =>
    | Promise<["bad" | typeDictUser[] | undefined, boolean]>
    | any;
  arrayIdsToUpdate: string[];
  setArrayIds: (value: string[]) => void;
  setIsSuccess: (value: boolean) => void;
};

export type TypeInsideMutationSave = {
  setIsSuccess: (value: boolean) => void;
  toSave: TypeUsersToSave | typeTileWithString[];
  arrayIdsToUpdate: string[] | undefined;
  idUser: string;
  setArrayIdsToUpdate: (value: string[]) => void;
};

export type TypeInsideMutationSaveSaveClick = {
  setIsSuccess: (value: boolean) => void;
  toSave: TypeUsersToSaveMutationSave;
  arrayIdsToUpdate: string[] | undefined;
  idUser: string;
};

export type typeMutationSaveTiles = {
  token: string;
  toSave: typeTileWithString[];
  isSuccess: (value: boolean) => void;
};

export type typeRegisterMutate = {
  email: string;
  name: string;
  password: string;
  setMessage: (value: string) => void;
  setUser: (value: User | null) => void;
  user: User | null;
};
export type typeDataRegister = {
  accessToken: string;
  message: string;
  id: string;
  name: string;
};

export type typeSignIn = {
  email: string;
  password: string;
  setMessage: (value: string) => void;
  user: User | null;
  setUser: (value: User | null) => void;
};

export type UserInServer = {
  name: string;
  role: string;
  _id: string;
};

export type typeUserMutation = {
  data: typedata;
  dictValues: dictValuesUserInsert;
};

export type typeWithMode = {
  mode: string;
};

export type User = {
  name: string;
  role: string;
  idUser: string;
  token: string;
  isInAdmin: boolean;
};

export type typeSignOrRegister =
  | {
      email: string;
      password: string;
    }
  | { email: string; password: string; name: string };

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

export type typeDictForChangesAllTilesWithString = {
  allHistory: typeTile[][];
  setAllHistory: (value: typeTile[][]) => void;
  setIsToDoLoader: (value: boolean) => void;
};

export type typeDictForChangesAllTiles = {
  allHistory: allHistoryType | null;
  setAllHistory: (value: allHistoryType | null) => void;
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

export type typePropertiesTiles = {
  saveFunction: () => Promise<typeTileWithString[] | typeTile[] | undefined>;
  undoFunction: () => Promise<typeTileWithString[] | typeTile[] | undefined>;
  setIsSuccess: (value: boolean) => void;
};

export type typePostAllTiles = {
  toSave: TypePostSomething | typeTileWithString[] | typeDictUser[];
  isSuccess: (value: boolean) => void;
};

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
  setUser: (value: User | null) => void;
  user: User | null;
};

export type dictMessageAndAccessToken = {
  accessToken: string;
  message: string;
  setMessage: (value: string) => void;
  role: string;
  idUser: string;
  name: string;
};

export type valueSetUser = (value: User | null) => void;

export type typeEnum =
  | colorsEnum.color1
  | colorsEnum.color2
  | colorsEnum.color3
  | colorsEnum.color4
  | "add";

export type setIsLoadingType = { setIsLoading: (value: boolean) => void };

export type messageType = { message: string };
