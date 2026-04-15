import { shchunot, type objectMosadType, type objectShchunaType } from "../../typesschema/neighboard.type";
import classes from "./rowTransfer.module.scss";
import { colorHelper } from "../../utils/ColorHelper";
import { properties } from "../../typesschema/neighboard.type";
import { useRef, useState } from "react";
import { schoolsHelper } from "../../utils/SchoolsHelper";
import { useMosadContext } from "../../provider/MosadContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { numberSchem, type numnberTypeForm } from "../../typesschema/formTransfer.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../reduxes/StoreNeighboard";
import { replace } from "../../reduxes/Neighboards.redux";
import { transferHelper } from "../../utils/TransferHelper";
import { useStateContext } from "../../provider/StateContext";
import { useSchoolToFillContext } from "../../provider/ScoolToFillContext";


export default function RowTransfer({ school, shchuna }: { school: objectMosadType, shchuna: objectShchunaType }) {
  const [isToShowT, setIsToShowT] = useState(false);

  const { register, handleSubmit } = useForm<numnberTypeForm>({
    resolver: zodResolver(numberSchem)
  });
  const { mosadToFill } = useSchoolToFillContext()

  const { mosad } = useMosadContext()

  if (mosad === null) {
    return <></>
  }

  const onSubmitForm: SubmitHandler<numnberTypeForm> = async (number: numnberTypeForm) => {
    if (mosad.current['mosad'] !== null)
    mosad.current['mosad'].total_students = mosad.current['mosad'].total_students - parseInt(number['amount'])
    if (mosadToFill !== null && mosadToFill.current['mosad']!== null) {
      mosadToFill.current['mosad'].total_students = mosadToFill.current['mosad'].total_students - parseInt(number['amount'])
    }
  };

  const { state } = useStateContext()

  return (
    <div className={classes.allRow}>
      <div
        className={classes.rowTransfer}
        onClick={() => {
          mosadToFill.current['mosad'] = school
          setIsToShowT(!isToShowT);
        }}
      >
        <p className={classes.km}>{schoolsHelper.getDistance(school, mosad.current['mosad'])}</p>
        <p className={classes.text}>{school.name}</p>
        <div
          className={classes[`color${colorHelper.getTheColorSchool(school, state)}`]}
        >
          <p className={classes.totalText}>
            {school.shelter_area - school.total_students}
          </p>
        </div>
      </div>

      {isToShowT ? (
        <form
          className={classes.twobuttons}
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <button type="submit" className={classes.startButton}>
            העבר
          </button>
          <input
            type="number"
            className={classes.endButton}
            placeholder="כמות ל"
            {...register("amount", { required: true })}
          />

        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
