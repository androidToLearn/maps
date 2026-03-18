import { useMosadContext } from "../../provider/MosadContext";
import { useShchunaContext } from "../../provider/ShchunaContext";
import ContentUp from "../contentUp/ContentUp";
import MosadContent from "../mosadContent/MosadContent";
import ShchunaContent from "../shchunaContent/ShchunaContent";
import AllShchunot from "../allShchunot/AllShchunot";
import classes from "./menu.module.scss";
import TypeMenu from "../typeMenu/TypeMenu";
import { useTypeSelectedContext } from "../../provider/TypeContext";
import RelativeMenu from "../relativeMenu/RelativeMenu";
import { useState } from "react";

export default function Menu() {
  const { shchuna } = useShchunaContext();
  const { mosad } = useMosadContext();
  const { typeSelected, setTypeSelected } = useTypeSelectedContext();
  const [isShowRelative , setIsShowRelative] = useState<boolean>(false)

  if (typeSelected === 2) {
    if (mosad === null) {
      return <>error</>
    }
    return (
      <div className={classes.menuOrder}>
        <ContentUp />
        <div className={classes.main}>
          <TypeMenu
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
          />
          {isShowRelative ? <RelativeMenu typeMenu={2}/> : <></>}
          <MosadContent mosad={mosad} setIsShowRelative = {setIsShowRelative} isShowRelative = {isShowRelative}/>
        </div>
      </div>
    );
  } else if (typeSelected === 1) {
    if (shchuna === null) {
      return <>error</>;
    }
    return (
      <div className={classes.menuOrder}>
        <ContentUp />
        <div className={classes.main}>
          <TypeMenu
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
          />
          <ShchunaContent shchuna={shchuna} />
        </div>
      </div>
    )
  }
  return (
    <div className={classes.menuOrder}>
      <ContentUp />
      <div className={classes.main}>
        <TypeMenu
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
        <AllShchunot />
      </div>
    </div>
  )
}
