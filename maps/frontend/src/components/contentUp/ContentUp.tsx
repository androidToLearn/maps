import { useShchunaContext } from "../../provider/ShchunaContext";
import classes from "./contentUp.module.scss";

export default function ContentUp() {
  const { shchuna } = useShchunaContext();
  if (shchuna === null) {
    return (
        <p className={classes.shemShcuna}>בחר אזור</p>
       
    );
  }
  return (
      <p className={classes.shemShcuna}>{shchuna.properties.shemshchun}</p>  
  );
}
