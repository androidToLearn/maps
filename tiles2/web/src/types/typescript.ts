import { useNavigate } from 'react-router-dom';
import type { SubmitHandler } from "react-hook-form";
import { Mutation } from "@tanstack/react-query";
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
  setIsToDoLoader: (value : boolean) => void;
  profile: string;
  setHasChanges: (value : boolean) => void;
  allHistory: { color: string; id: string; createdAt: Date; updatedAt: Date }[][];
  hasChanges: boolean;
  token: string;
  setAllHistory: (value : { color: string; id: string; createdAt: Date; updatedAt: Date }[][]) => void;
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
    }[][]
  ) => void;
  setIsChanged: (value: boolean) => void;
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

export type typeOneTile = {
  color: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

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
  index: number;
  color: string;
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
};
