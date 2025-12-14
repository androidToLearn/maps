import { Tile_service } from "../service/tile_service";
import { fetchInstance } from "../instance/Instance";
import axios from "axios";

export class AllTilesQuery {
  getAllTiles(data: any, dictValues: any) {
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
      createdAt: "",
      updatedAt: "",
    });
    dictValues["allHistory"].push(arrayAllTiles);
    dictValues["setAllHistory"]([...dictValues["allHistory"]]);
    dictValues["setIsToDoLoader"](false);
  }

  async allTilesFetch(dictValues: any) {
    fetchInstance(
      "/tile/all",
      new AllTilesQuery().getAllTiles,
      dictValues,
      {},
      "get"
    );
  }

  async getAll() {
    try {
      const response = await axios.get("http://localhost:8000/tile/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const tilesService = new AllTilesQuery();
