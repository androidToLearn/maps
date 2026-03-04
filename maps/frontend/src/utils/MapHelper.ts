import type { theJsonShchunot } from "../typesschema/neighboard.type";
class MapHelper {
  allShchunot(allJson: theJsonShchunot) {
    const shchonut = allJson["features"];
    const shchunotAll = new Map();
    const colors = []
    const arrayIds: string[] = [];
    for (const shchona in shchonut) {
      const schools = shchonut[shchona]["properties"]["schools"];
      const id = shchonut[shchona]["properties"]["UniqueId"];

      for (const school in schools) {
        const oneMarkJson = schools[school];
        const neighboardName = schools[school]["neighborhood"];
        if (shchunotAll.has(neighboardName)) {
          shchunotAll.get(neighboardName).push(oneMarkJson);
          arrayIds.push(id);
        } else {
          shchunotAll.set(neighboardName, [oneMarkJson]);
        }
      }
    }
    const entriesArray = Array.from(shchunotAll);
    const allOrderedShcunot = entriesArray.map(([key, value], i) => ({
      name: key,
      schools: value,
      id: arrayIds[i],
    }));
    return allOrderedShcunot;
  }

  allPolygons(allJson: theJsonShchunot) {

    const shchonut = allJson["features"];
    const polygonAll = [];
    for (const shchona in shchonut) {
      const gemoetry = shchonut[shchona]["geometry"];
      const id = shchonut[shchona]["properties"]["UniqueId"];
      polygonAll.push({ coordinates: gemoetry["coordinates"], id: id , color : 'red' , 'isClicked' : false});
    }

    return polygonAll;
  }
  }

//כל השכונות כל המוסדות
export const mapHelper = new MapHelper();
//לסדר גם לכל מבנה ופוליגון color נכון
//לסדר color לשכונה
//שומר את השכונה שלחץ עליה ומיתוכה מוצא לפי id
//מוצא שכונה לפי poligon על כל השכונות לפי id