import { useState } from "react";
import classes from "./guid.module.scss";
import { useStateContext } from "../../provider/StateContext";
export default function Guid() {
  const [isShowText, setIsToShowText] = useState(false);
  const { state } = useStateContext();
  const guids = ['']
  if(state === 1)
  {
    guids[0] = 'אין הנחיות מיוחדות'
  }
  else if(state === 2)
  {
    guids[0] = 'אין הנחיות מיוחדות'
  }
  else if(state === 3)
  {
    guids[0] = 'כל תלמיד צריך לקבל לפחות 0.5 מ"ר'
  }
  else if(state === 4)
  {
    guids[0] = 'כל תלמיד צריך לקבל לפחות 2 מ"ר'
  }
  
  return (
    <div className={classes.guids}>
      {isShowText ? (
        <p className={classes.myGuidText}>{guids[0]}</p>
      ) : (
        <></>
      )}
      <img
        src={"public/myGuuidImage.png"}
        className={classes.guidButton}
        onClick={() => {
          setIsToShowText(!isShowText);
        }}
      />
    </div>
  );
}
