import classes from "../components/OneTile/oneTile.module.scss";
import { colorsEnum, colorsEnumWithoutAdd } from "../types/EnumColors";

export const getTypeColors = (
  color: colorsEnumWithoutAdd | colorsEnum | string,
) => {
  if (color === colorsEnumWithoutAdd.color1) {
    return classes.tileborn;
  }
  if (color === colorsEnumWithoutAdd.color2) {
    return classes.tileorange;
  }
  if (color === colorsEnumWithoutAdd.color3) {
    return classes.tilegray;
  }
  if (color === colorsEnumWithoutAdd.color4) {
    return classes.tilered;
  }
};

export const getTypeColorsWithStartColor = (color: colorsEnum) => {
  if (color === colorsEnum.color1) {
    return classes.colorborn;
  }
  if (color === colorsEnum.color2) {
    return classes.colororange;
  }
  if (color === colorsEnum.color3) {
    return classes.colorgray;
  }
  if (color === colorsEnum.color4) {
    return classes.colorred;
  }
};

export const getTypeColorsWithStartColorWithOutAdd = (
  color: colorsEnumWithoutAdd,
) => {
  if (color === colorsEnumWithoutAdd.color1) {
    return classes.colorborn;
  }
  if (color === colorsEnumWithoutAdd.color2) {
    return classes.colororange;
  }
  if (color === colorsEnumWithoutAdd.color3) {
    return classes.colorgray;
  }
  if (color === colorsEnumWithoutAdd.color4) {
    return classes.colorred;
  }
};
