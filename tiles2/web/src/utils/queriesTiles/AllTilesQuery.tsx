import { fetchInstanceWithToken } from "../../instance/Instance";
import type {
  typeTileWithString,
  valueSetUser,
} from "../../types/typesAllProject";
import type { typeDictForChangesAllTiles } from "../../types/typesAllProject";
import { tilesSchemaArray } from "../../typesschema/tile.types";
export class AllTilesQuery {
  getAllTiles(
    data: typeTileWithString[],
    dictValues: typeDictForChangesAllTiles,
  ) {
    if (dictValues["allHistory"] === null) return;
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
  }

  async allTilesFetch(
    setUser: valueSetUser,
    logout: (value: valueSetUser) => void,
  ) {
    try {
      const response = await fetchInstanceWithToken().get("/tiles/all");
      const result = tilesSchemaArray.safeParse(response);
      if (!result.success) {
        throw Error("bad data");
      }
      return response;
    } catch (err) {
      logout(setUser);
      return "bad";
    }
  }
}

export const tilesService = new AllTilesQuery();
