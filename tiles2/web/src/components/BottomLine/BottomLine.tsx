import type {
  typeFunctionToBeWithMutate,
  typePropertiesTiles,
} from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import classes from "./BottomLine.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../provider/AuthContext";
import { saveAllTilesQuery } from "../../utils/queriesTiles/SaveAllTilesQuery";
import type { typePostAllTiles } from "../../types/typescript";
import ButtonDoSomething from "../buttonDoSomething/ButtonDoSomething";
export default function BottomLine({
  saveFunction,
  undoFunction,
  setIsSuccess,
}: typePropertiesTiles) {
  const queryClient = useQueryClient();

  const mutationSave = useMutation({
    mutationFn: async (data: typePostAllTiles) => {
      new saveAllTilesQuery().saveAllTiles(data, data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTiles"],
      });
    },
  });

  const context = useUserContext();
  const user = context.user;
  if (user === null) {
    return <></>;
  }

  const functionWithMutate = (
    parameterFunction: typeFunctionToBeWithMutate,
  ) => {
    parameterFunction().then((response) => {
      if (typeof response === "string") {
        return response;
      }
      


      if (response !== undefined) {
        mutationSave.mutate({
          toSave: response,
          isSuccess: setIsSuccess,
        });
      }
    });
  };

  return (
    <div className={classes.lastLine}>
      <ButtonDoSomething
        functionToDo={() =>
          functionWithMutate(undoFunction)
        }
        textToShow={"undo"}
      />

      <ButtonDoSomething
        functionToDo={() => functionWithMutate(saveFunction)}
        textToShow={"save"}
      />
    </div>
  );
}
