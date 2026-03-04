import { useMosadContext } from "../../provider/MosadContext";
import { useShchunaContext } from "../../provider/ShchunaContext";
import ContentUp from "../contentUp/ContentUp";
import MosadContent from "../mosadContent/MosadContent";
import ShchunaContent from "../shchunaContent/ShchunaContent";
import AllShchunot from "../allShchunot/AllShchunot";
import classes from "./menu.module.scss";
import TypeMenu from "../typeMenu/TypeMenu";
import { useState } from "react";

export default function Menu() {
  const { shchuna, setShchuna } = useShchunaContext();
  const { mosad, setMosad } = useMosadContext();
  const [typeSelected , setTypeSelected] = useState<number>(0)
  if (typeSelected === 2) {
    return (
      <div className={classes.menuOrder}>
        <ContentUp />
        <MosadContent mosad={mosad} />;
      </div>
    );
  }
  else if (typeSelected === 1) {
    return (
      <div>
        <ContentUp />
        <ShchunaContent shchuna={shchuna} />;
      </div>
    );
  }
  return (
    <div className={classes.menuOrder}>
      <ContentUp />
      <div className={classes.main}>
        <TypeMenu typeSelected = {typeSelected}  setTypeSelected = {setTypeSelected}/>
        <AllShchunot typeSelected = {typeSelected}  setTypeSelected = {setTypeSelected}/>
      </div>
    </div>
  );
}
