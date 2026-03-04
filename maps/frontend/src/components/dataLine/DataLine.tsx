import classes from "./dataLine.module.scss";
import { useStateContext } from "../../provider/StateContext";
import ButtonState from "../buttonState/ButtonState";
import Guid from "../guide/Guid";

export default function DataLine() {
  const { state, setState } = useStateContext();
  const arrayStates = [1, 2, 3, 4];
  return (
    <div className={classes.dataLine}>
      <div className={classes.stateButtons}>
        {arrayStates.map((stateOne: number, index: number) => {
          return (
            <ButtonState
              state={state}
              setState={setState}
              stateToShow={stateOne}
              key={index}
            />
          );
        })}
      </div>
      <Guid />

      <p className={classes.textP}>ממוצע אחוז התפוסה באזור</p>
      <p className={classes.textPrecent}>10%</p>
    </div>
  );
}
