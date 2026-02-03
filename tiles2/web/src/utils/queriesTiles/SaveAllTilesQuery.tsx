import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typeISuccessDict } from "../../types/typescript";
import type { typePostAllTiles } from "../../types/typescript";
export class saveAllTilesQuery {
  async saveAllTiles(data: typePostAllTiles, dictValues: typeISuccessDict) {
    await fetchInstanceWithToken()
      .post("/tiles/saveAll", data["toSave"])
      .catch((error) => {
      });
    dictValues["isSuccess"](true);
  }
}
