import type { objectShchunaType } from "../typesschema/neighboard.type";

class MosadHelper {
  getAllMosdot(allShchunot : objectShchunaType[]) {
    const shchunot = []
    const schools = [];
    for (const shchuna of allShchunot) {
      schools.push(...shchuna.properties.schools);
      shchunot.push(shchuna)
    }
    return {'schools' : schools , 'shchunot' : shchunot};
  }
}

export const mosdotHelper = new MosadHelper()
