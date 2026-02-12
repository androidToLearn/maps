import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typePostAllTiles } from "../../types/typescript";
export class saveAllTilesQuery {
  async saveAllTiles(data: typePostAllTiles, dictValues: typePostAllTiles) {
    dictValues["isSuccess"](true);

    await fetchInstanceWithToken()
      .post("/tiles/saveAll", data["toSave"])
      .catch((error) => {});
  }
}
