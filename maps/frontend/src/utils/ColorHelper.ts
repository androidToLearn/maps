import type {
  objectMosadType,
  objectShchunaType,
} from "../typesschema/neighboard.type";

class ColorHelper {
  getTheColorSchool(school: objectMosadType) {
    return "red";
  }

  getColorShcuna(shcuna: objectShchunaType) {
    return "red";
  }
}

export const colorHelper = new ColorHelper();
