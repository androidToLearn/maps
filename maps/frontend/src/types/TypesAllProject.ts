import type {
  objectShchunaType,
  theJsonShchunot,
} from "../typesschema/neighboard.type";

export type MarkType = {
  position: [number | undefined, number | undefined];
  props: string | undefined;
  color: string;
};
export type propertiesMapTypes = {
  position: [number, number];
  zoom: number;
  shchunot: theJsonShchunot;
};

export type shchunaSelected = {
  shchunaSelected: objectShchunaType | null;
};

export type markPropertiesType = {
  position: [number, number];
  props: string | undefined;
  color: string;
};

export type polygonsPropertiesType = {
  shchunot: theJsonShchunot;
};

export type shchunot = {
  shchunaToShow: objectShchunaType | null;
  shchunaSelected: objectShchunaType | null;
  setShchuna: (value: objectShchunaType) => void;
};

export type StatePropertiesTypes = {
  state: number;
  setState: (value : number) => void;
  stateToShow : number;
};
