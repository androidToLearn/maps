import { useSelector } from "react-redux";
import type { RootState } from "../../reduxes/StoreNeighboard";
import TheMap from "../../components/theMap.tsx/TheMap";
import UpLine from "../../components/upLine/UpLine";
import Menu from "../../components/menu/Menu";
import DataLine from "../../components/dataLine/DataLine";
import classes from "./allProject.module.scss";
export default function AllProject() {
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  if (neighboards === null) {
    return <></>;
  }
  //3 מצבים
  //עושה על מה שצריך
  return (
    <div className={classes.mainProject}>
      <UpLine />
      <Menu />
      <DataLine />
      <TheMap
        shchunot={neighboards}
        position={[34.79624294387394, 32.130387818159626]}
        zoom={20}
      />
    </div>
  );
}
