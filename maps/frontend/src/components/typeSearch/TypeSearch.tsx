import classes from "./typeSearch.module.scss";
import { useTypeSearchContext } from "../../provider/TypeSearchContext";
import RelativeMenu from "../relativeMenu/RelativeMenu";
import { useState } from "react";

export default function TypeSearch({ typeMenu }: { typeMenu : number}) {
  const { toSearch, setToSearch } = useTypeSearchContext()
  const [isMenuOpened , setIsMenuOpened] = useState<boolean>(false)
  return (
    <div className={classes.mainDiv}>
      <div className={classes.search}>
        <input type="button" className={classes.btnSearch} onClick={() => {
          setIsMenuOpened(!isMenuOpened)
        }}></input>
        <input type="text" className={classes.edit} placeholder="...חפש אזור" onInput={(e : any) => {
          toSearch['worlds'] = e.target.value
          setToSearch({...toSearch})
        }}></input>
      </div>
      {isMenuOpened ? <RelativeMenu typeMenu={typeMenu}/> : <></>}
      
    </div>
  );
}
