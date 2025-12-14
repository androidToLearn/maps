
export class Tile_service {
 

  getCopyLastAllHistory(
    allHistory: { color: any; id: any; createdAt: any; updatedAt: any }[][]
  ) {
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
