import classes from "./typeSearch.module.scss";
import { useTypeSearchContext } from "../../provider/TypeSearchContext";
import RelativeMenu from "../relativeMenu/RelativeMenu";

export default function TypeSearch({ typeMenu }: { typeMenu : number}) {
  const { toSearch, setToSearch } = useTypeSearchContext()
  
  return (
    <div className={classes.mainDiv}>
      <div className={classes.search}>
        <input type="button" className={classes.btnSearch}></input>
        <input type="text" className={classes.edit} placeholder="...חפש אזור" onInput={(e : any) => {
          toSearch['worlds'] = e.target.value
          setToSearch({...toSearch})
        }}></input>
      </div>
      <RelativeMenu typeMenu={typeMenu}/>
      
    </div>
  );
}
