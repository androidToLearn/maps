import classes from "./upLine.module.scss";
export default function UpLine() {
  return (
    <div className={classes.upLine}>
      <img src={"public/image1.png"} className={classes.image1}></img>
      <img src={"public/image2.png"} className={classes.image2}></img>
      <p className={classes.text}>ניתוב תלמידים למקומות ממוגנים</p>
    </div>
  );
}
