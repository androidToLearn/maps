import { shchunot, type objectMosadType, type objectShchunaType } from "../../typesschema/neighboard.type";
import classes from "./rowTransfer.module.scss";
import { colorHelper } from "../../utils/ColorHelper";
import { properties } from "../../typesschema/neighboard.type";
import { useState } from "react";
import { schoolsHelper } from "../../utils/SchoolsHelper";
import { useMosadContext } from "../../provider/MosadContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { numberSchem, type numnberTypeForm } from "../../typesschema/formTransfer.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../reduxes/StoreNeighboard";
import { replace } from "../../reduxes/Neighboards.redux";
import { transferHelper } from "../../utils/TransferHelper";


export default function RowTransfer({ school, shchuna }: { school: objectMosadType, shchuna: objectShchunaType }) {
  const [isToShowT, setIsToShowT] = useState(false);

  const { register, handleSubmit, formState } = useForm<numnberTypeForm>({
    resolver: zodResolver(numberSchem)
  });

  const { mosad, setMosad } = useMosadContext()
  const dispatch = useDispatch<AppDispatch>();

  if (mosad === null) {
    return <></>
  }
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );

  const onSubmitForm: SubmitHandler<numnberTypeForm> = async (number: numnberTypeForm) => {
    setMosad({ ...mosad, total_students: mosad.total_students - parseInt(number['amount']) })

    setTimeout(()=> {

      const newSchool = { ...school, total_students: school.total_students + parseInt(number['amount']) }
      const newProperties = {
        ...shchuna.properties, schools: [...shchuna.properties.schools.filter(school => {
          school.id !== newSchool.id
        }), newSchool]
      }
      const newShchuna = {
        ...shchuna, properties: newProperties
      }
      if (neighboards === null) {
        return
      }
      const newShchunot = [...neighboards.filter(shchuna =>
        shchuna.properties.UniqueId !== newShchuna.properties.UniqueId
      ), newShchuna]
      if (shchunot.safeParse(newShchunot).success && newShchunot !== null) {
        dispatch(replace([...newShchunot]));
        localStorage.setItem("neighboards", JSON.stringify(newShchunot));
      }
    } , 1000)
    
  };

  return (
    <div className={classes.allRow}>
      <div
        className={classes.rowTransfer}
        onClick={() => {
          setIsToShowT(!isToShowT);
        }}
      >
        <p className={classes.km}>{schoolsHelper.getDistance(school, mosad)}</p>
        <p className={classes.text}>{school.name}</p>
        <div
          className={classes[`color${colorHelper.getTheColorSchool(school)}`]}
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
