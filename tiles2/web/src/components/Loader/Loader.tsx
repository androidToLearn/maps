import classes from './loader.module.scss'
import { useEffect, useState } from "react";
export default function Loader() {
  const [progress, setProgress] = useState<number>(10);
  useEffect(() => {
    setInterval(() => {
      setProgress(progress + 1);
    }, 50);
  }, []);


  return (
    <div className={classes.main}>
      <div className={classes.loader}></div>
    </div>
  );
}
