import classes from "./buttonDoSomething.module.scss";
import { useState } from "react";

export default function ButtonDoSomething({
  functionToDo,
  textToShow,
}: {
  functionToDo: () => void;
  textToShow: string;
}) {
  const [isAbleClick, setIsAbleClick] = useState(true);
  return (
    <>
      {isAbleClick ? (
        <button
          className={classes.btnSave}
          onClick={async () => {
            setIsAbleClick(false);
            await functionToDo();
            setIsAbleClick(true);
          }}
        >
          {textToShow}
        </button>
      ) : (
        <button className={classes.btnSaveDisabled}>{textToShow}</button>
      )}
    </>
  );
}
