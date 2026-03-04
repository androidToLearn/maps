import { allJson } from "../typesschema/neighboard.type";
import axios from "axios";

class NighboardsFetcher {
  async getNeighbords() {
    const res = await axios("public/neighbourhoods.json");
    if (res === undefined) {
      throw new Error("undefined");
    }
    const result = allJson.safeParse(res.data);

    if (!result.success) {
      throw Error("bad arguments");
    }
    return result.data;
  }
}

export const neighboardFeatcher = new NighboardsFetcher();
