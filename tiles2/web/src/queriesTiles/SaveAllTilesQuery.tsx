import { fetchInstance } from "../instance/Instance";

export class saveAllTilesQuery {
  async saveAllTiles(data: any, dictValues: any) {
    try {
      fetchInstance(
        "/tile/saveAll",
        this.doNothing,
        dictValues,
        JSON.stringify(data["toSave"]),
        "POST"
      );
    } catch (err) {
      throw { error: err };
    }
  }
  doNothing(data: any, dictValues: any) {
    console.log("true");
    dictValues["isSuccess"](true);
  }
}
