import { Admin_Service } from "../../services/admin_service";
import type { BottomLineAdminDictTypes } from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { SaveAllUsers } from "../../utils/QueryAdmin/SaveAllQuery";
import type { TypeInsideMutationSave } from "../../types/typescript";
import classes from './bottomLineAdmin.module.scss'
export default function BottomLineAdmin({
  isAbleClickUndo,
  setIsAbleClickUndo,
  token,
  idUser,
  allHistory,
  isChanged,
  setAllHistory,
  setIsChanged,
  setIsSuccess,
  arraysIdsToUpdate,
}: BottomLineAdminDictTypes) {
  const admin_service = new Admin_Service();
  const mutationSave = useMutation({
    mutationFn: async (data: TypeInsideMutationSave) => {
      new SaveAllUsers().saveAllUsers(data, data);
      return data;
    },
    retry: 3,
  });

  return (
    <div className={classes.lastLine}>
      <button
        className={classes.btnUndo}
        onClick={async () => {
          if (isAbleClickUndo) {
            setIsAbleClickUndo(false);
            if (token === null) return;
            if (idUser !== null) {
              new Admin_Service()
                .clickUndo(
                  allHistory,
                  isChanged,
                  setAllHistory,
                  setIsChanged,
                  setIsAbleClickUndo,
                )
                .then((response) => {
                  if (response !== "bad") {
                    mutationSave.mutate({
                      setIsSuccess: setIsSuccess,
                      toSave: response,
                      arrayIdsToUpdate: arraysIdsToUpdate,
                      idUser: idUser,
                    });
                  }
                });
            }
            setIsAbleClickUndo(true);
          }
        }}
      >
        Undo
      </button>{" "}
      <button
        className={classes.btnSave}
        onClick={async () => {
          if (isAbleClickUndo) {
            setIsAbleClickUndo(false);
            if (token === null) return;
            if (idUser !== null) {
              await admin_service
                .clickSave(isChanged, setIsChanged, setIsAbleClickUndo)
                .then((response) => {
                  if (response === "changed") {
                    mutationSave.mutate({
                      setIsSuccess: setIsSuccess,
                      toSave: allHistory[allHistory.length - 1],
                      arrayIdsToUpdate: arraysIdsToUpdate,
                      idUser: idUser,
                    });
                  }
                });
            }
            setIsAbleClickUndo(true);
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
