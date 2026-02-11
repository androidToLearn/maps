import type {
  typeFunctionToBeWithMutate,
  typePropertiesBottomLineAdmin,
} from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { SaveAllUsers } from "../../utils/QueryAdmin/SaveAllQuery";
import type { TypeInsideMutationSave } from "../../types/typescript";
import classes from "./bottomLineAdmin.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../provider/AuthContext";
import ButtonDoSomething from "../buttonDoSomething/ButtonDoSomething";
export default function BottomLineAdmin({
  saveFunction,
  undoFunction,
  arrayIdsToUpdate,
  setArrayIds,
  setIsSuccess,
}: typePropertiesBottomLineAdmin) {
  const queryClient = useQueryClient();

  const mutationSave = useMutation({
    mutationFn: async (data: TypeInsideMutationSave) => {
      new SaveAllUsers().saveAllUsers(data, data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
    },
    retry: 3,
  });
  const context = useUserContext();
  const user = context.user;
  if (user === null) {
    return <></>;
  }

  const idUser = user.idUser;

  const functionWithMutate = (
    parameterFunction: typeFunctionToBeWithMutate,
  ) => {
    return parameterFunction().then((response) => {
      if (typeof response === "string") return;
     
      if (response !== undefined) {
        mutationSave.mutate({
          setIsSuccess: setIsSuccess,
          toSave: response,
          arrayIdsToUpdate: arrayIdsToUpdate,
          idUser: idUser,
          setArrayIdsToUpdate: setArrayIds,
        });
      }
    });
  };

  return (
    <div className={classes.lastLine}>
      <ButtonDoSomething
        functionToDo={() => functionWithMutate(undoFunction)}
        textToShow={"undo"}
      />

      <ButtonDoSomething
        functionToDo={() => functionWithMutate(saveFunction)}
        textToShow={"save"}
      />
    </div>
  );
}
