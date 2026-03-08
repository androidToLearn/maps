import classes from "./typeSearch.module.scss";
import RelativeMenu from "../relativeMenu/RelativeMenu";

export default function TypeSearch({ setToSearch }: any) {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.search}>
        <input type="button" className={classes.btnSearch}></input>
        <input type="text" className={classes.edit} placeholder="...חפש אזור"></input>
      </div>
      <RelativeMenu/>
      
    </div>
  );
}
