import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typePostAllTiles } from "../../types/typescript";
export class saveAllTilesQuery {
  async saveAllTiles(data: typePostAllTiles, dictValues: typePostAllTiles) {
    await fetchInstanceWithToken()
      .post("/tiles/saveAll", data["toSave"])
      .catch((error) => {
      });
    dictValues["isSuccess"](true);
  }
}
