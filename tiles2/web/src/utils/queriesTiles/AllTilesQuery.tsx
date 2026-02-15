import { fetchInstanceWithToken } from "../../instance/Instance";
import type {  typeTileWithString } from "../../types/typescript";
import type { typeDictForChangesAllTiles } from "../../types/typescript";
import type { tilesSchemaArray } from "../../typesschema/tile.types";
export class AllTilesQuery {
  getAllTiles(data: typeTileWithString[], dictValues: typeDictForChangesAllTiles) {
    if(dictValues['allHistory'] === null)return
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

  async allTilesFetch() {
    try{
    const response = await fetchInstanceWithToken().get("/tiles/all");
    const result = tilesSchemaArray.safeParse(response)
    return response
    }
    catch(err)
    {

    }
   
  }
}


export const tilesService = new AllTilesQuery();



const result = userSchema.safeParse({
  name: "Dan",
  email: "dan@gmail.com",
  age: 20,
});

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log(result.data); // הנתונים התקינים
}