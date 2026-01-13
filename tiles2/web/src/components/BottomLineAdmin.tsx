import { Admin_Service } from "../service/admin_service";
import type { BottomLineAdminDictTypes } from "../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { SaveAllUsers } from "../QueryAdmin/SaveAllQuery";
import { useNavigate } from "react-router-dom";
export default function BottomLineAdmin({
  isAbleClickUndo,
  setIsAbleClickUndo,
  token,
  idUser,
  allHistory,
  isChanged,
  setAllHistory,
  setIsChanged,
  isSuccess,
  arrayIdsToUpdate,
}: BottomLineAdminDictTypes) {
  const admin_service = new Admin_Service();
  const mutationSave = useMutation({
    mutationFn: (data: any) => {
      new SaveAllUsers().saveAllUsers(data, data);
      return data;
    },
    retry: 3,
  });
  const navigator = useNavigate();

  return (
    <div className="lastLine">
      <button
        className="btnUndo"
        onClick={async () => {
          if (isAbleClickUndo) {
            setIsAbleClickUndo(false);
            if (token === null) return;
            if (idUser !== null) {
              new Admin_Service().clickUndo(
                allHistory,
                isChanged,
                setAllHistory,
                setIsChanged,
                token,
                setIsAbleClickUndo,
                idUser,
                isSuccess,
                arrayIdsToUpdate,
                mutationSave,
                navigator
              );
            }
            setIsAbleClickUndo(true);
          }
        }}
      >
        Undo
      </button>{" "}
      <button
        className="btnSave"
        onClick={async () => {
          if (isAbleClickUndo) {
            setIsAbleClickUndo(false);
            if (token === null) return;
            if (idUser !== null) {
              await admin_service.clickSave(
                token,
                isChanged,
                setIsChanged,
                allHistory,
                setAllHistory,
                setIsAbleClickUndo,
                idUser,
                isSuccess,
                arrayIdsToUpdate,
                mutationSave,
                navigator
              );
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
