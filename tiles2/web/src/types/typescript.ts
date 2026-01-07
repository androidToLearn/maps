import type { SubmitHandler } from "react-hook-form";
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

export type typeHistoryUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}[][];

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

export type BottomLineType = {
  dict: BottomLineDictTypes;
};

export type BottomLineDictTypes = {
  name: string;
  setIsToDoLoader: any;
  profile: string;
  setHasChanges: any;
  allHistory: any;
  hasChanges: boolean;
  token: string;
  setAllHistory: any;
  mutation: any;
  isSuccess: (value: boolean) => void;
  navigate: any;
};

export type UpLineType = {
  dict: UpLineDictTypes;
};

export type UpLineDictTypes = {
  name: string;
  profile: string;
  navigate: any;
  isAdminPage: boolean;
};

export type BottomLineAdminType = {
  dict: BottomLineAdminDictTypes;
};

export type BottomLineAdminDictTypes = {
  isAbleClickUndo: boolean;
  setIsAbleClickUndo: (value: boolean) => void;
  token: string | null;
  idUser: string | null;
  allHistory: any;
  isChanged: boolean;
  setAllHistory: (
    value: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][]
  ) => void;
  setIsChanged: (value: boolean) => void;
  setName: (value: string) => void;
  setProfile: (value: string) => void;
  navigate: any;
  mutation: any;
  isSuccess: (value: boolean) => void;
  arrayIdsToUpdate: string[] | undefined;
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

export type TypeOneTileDict = {
  hasChanges: boolean;
  allArichim: { color: string; id: string; createdAt: Date; updatedAt: Date }[];
  allHistory: {
    color: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  setAllHistory: (
    value: { color: string; id: string; createdAt: Date; updatedAt: Date }[][]
  ) => void;
  setHasChanges: (value: boolean) => void;
  profile: string;
};

export type filterType = {
  dict: filterDictType;
};

export type filterDictType = {
  filter: number;
  isScreenSmall: boolean;
  setIsMenuOpened: (value: boolean) => void;
  setFilter: (value: number) => void;
};

export type TypeAllTilesComponent = {
  properties: TypeAllTilesDict;
};

export type TypeAllTilesDict = {
  profile: string;
  allArichim: { color: string; id: string; createdAt: Date; updatedAt: Date }[];
  hasChanges: boolean;
  allHistory: {
    color: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[][];
  setAllHistory: (
    value: { color: string; id: string; createdAt: Date; updatedAt: Date }[][]
  ) => void;
  setHasChanges: (value: boolean) => void;
};

export type TypeRowUserDict = {
  allUsers: TypeUsersToSave;
  isChanged: boolean;
  allHistory: typeHistoryUser;
  setIsChanged: (value: boolean) => void;
  setAllHistory: (value: typeHistoryUser) => void;
  myIdUser: string;
  arrayIdsToUpdate: string[] | undefined;
  setArrayIds: (value: string[]) => void;
};

export type TypeRowUser = {
  properties: TypeRowUserDict;
  index: number;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };
};
