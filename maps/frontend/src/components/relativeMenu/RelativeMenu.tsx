import classes from "./relativeMnue.module.scss";

export default function RelativeMenu() {
  return (
    <div className={classes.relativeMenu}>
      <p className={classes.upText}>סדר לפי</p>
      <div className={classes.divRow}>
        <p className={classes.textUp}>אחוז התפוסה</p>
        <button className={classes.buttonUpMenuRelative}></button>
        <p className={classes.textUp}>סדר הא-ב</p>
        <button className={classes.buttonUpMenuRelative}></button>
      </div>
      <p className={classes.upText}>סנן לפי</p>
      <div className={classes.divColor}>
        <div className={classes.buttonColors}>
          <button className={classes.divOneButtonColor}></button>
          <button className={classes.divOneButtonColor}></button>
          <button className={classes.divOneButtonColor}></button>
        </div>
        <p className={classes.textUp}>הצג לפי צבע</p>
      </div>
    </div>
  );
}
