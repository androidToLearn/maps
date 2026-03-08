import type { objectMosadType, objectShchunaType } from "../typesschema/neighboard.type";

class MosadHelper {
  getAllMosdot(allShchunot : objectShchunaType[]) {
    console.log(allShchunot)
    const schools = [];
    for (const shchuna of allShchunot) {
      schools.push(...shchuna.properties.schools);
    }
    return schools;
  }
}

export const mosdotHelper = new MosadHelper()
