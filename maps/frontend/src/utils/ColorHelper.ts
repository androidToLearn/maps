import type {
  objectMosadType,
  objectShchunaType,
} from "../typesschema/neighboard.type";

class ColorHelper {
  getTheColorSchool(school: objectMosadType | null, state : number | string) {
    return "red";
  }

  getColorShcuna(shcuna: objectShchunaType | null, state : number | string) {
    return "red";
  }
}

export const colorHelper = new ColorHelper();
