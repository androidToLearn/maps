import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typeTile } from "../../types/typescript";
import type { typeDictForChangesAllTiles } from "../../types/typescript";

export class AllTilesQuery {
  getAllTiles(data: typeTile[], dictValues: typeDictForChangesAllTiles) {
    dictValues["allHistory"].splice(dictValues["allHistory"].length - 1, 1);
    const arrayAllTiles = [];
    for (const oneTile in data) {
      const toTile = {
        color: data[oneTile]["color"],
        id: data[oneTile]["id"],
        createdAt: data[oneTile]["createdAt"],
        updatedAt: data[oneTile]["updatedAt"],
      };
      arrayAllTiles.push(toTile);
    }
    arrayAllTiles.push({
      color: "add",
      id: "-2",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    dictValues["allHistory"].push(arrayAllTiles);
    dictValues["setAllHistory"]([...dictValues["allHistory"]]);
    dictValues["setIsToDoLoader"](false);
  }

  async allTilesFetch(dictValues: typeDictForChangesAllTiles) {
    const response = await fetchInstanceWithToken().get("/tiles/all");
    if (response !== undefined) {
      this.getAllTiles(response, dictValues);
    }
  }
}

export const tilesService = new AllTilesQuery();
