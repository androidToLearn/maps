import type { allHistoryType } from "../types/typesAllProject";
export class TileService {
  getCopyLastAllHistory(allHistory: allHistoryType | null) {
    if (allHistory === null) return;
    const lastAllHistory = allHistory[allHistory.length - 1];
    const newAllArichim = [];
    for (const index in lastAllHistory) {
      newAllArichim.push({
        color: lastAllHistory[index]["color"],
        id: lastAllHistory[index]["id"],
        createdAt: lastAllHistory[index]["createdAt"],
        updatedAt: lastAllHistory[index]["updatedAt"],
      });
    }

    return newAllArichim;
  }
}
