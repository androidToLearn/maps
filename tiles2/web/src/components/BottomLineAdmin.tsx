import type { BottomLineAdminType } from "../types/typescript";
import { Admin_Service } from "../service/admin_service";
export default function BottomLineAdmin({ dict }: BottomLineAdminType) {
  const admin_service = new Admin_Service();
  return (
    <div className="lastLine">
      <button
        className="btnUndo"
        onClick={async () => {
          if (dict["isAbleClickUndo"]) {
            dict["setIsAbleClickUndo"](false);
            if (dict["token"] === null) return;
            if (dict["idUser"] !== null) {
              new Admin_Service().clickUndo(
                dict["allHistory"],
                dict["isChanged"],
                dict["setAllHistory"],
                dict["setIsChanged"],
                dict["token"],
                dict["setIsAbleClickUndo"],
                dict["idUser"],
                dict["mutation"],
                dict["isSuccess"],
                dict['navigate'],
                dict['arrayIdsToUpdate']
              );
            }
            dict["setIsAbleClickUndo"](true);
          }
        }}
      >
        Undo
      </button>{" "}
      <button
        className="btnSave"
        onClick={async () => {
          if (dict["isAbleClickUndo"]) {
            dict["setIsAbleClickUndo"](false);
            if (dict["token"] === null) return;
            if (dict["idUser"] !== null) {
              await admin_service.clickSave(
                dict["token"],
                dict["isChanged"],
                dict["setIsChanged"],
                dict["allHistory"],
                dict["setAllHistory"],
                dict["setIsAbleClickUndo"],
                dict["idUser"],
                dict["mutation"],
                dict["isSuccess"],
                dict['navigate'],
                dict['arrayIdsToUpdate']
              );
            }
            dict["setIsAbleClickUndo"](true);
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
