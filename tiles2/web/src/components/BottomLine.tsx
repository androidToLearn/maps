import type { BottomLineDictTypes } from "../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { saveAllTilesQuery } from "../queriesTiles/SaveAllTilesQuery";
import { useQuery } from "@tanstack/react-query";
import { AllTilesQuery } from "../queriesTiles/AllTilesQuery";
import { useNavigate } from "react-router-dom";

export const BottomLine =  ({
  setIsToDoLoader,
  profile,
  setHasChanges,
  allHistory,
  hasChanges,
  token,
  setAllHistory,
  isSuccess,
}: BottomLineDictTypes) =>{
  const navigate = useNavigate()
  const mutationSave = useMutation({
    mutationFn: (data: any) => {

      setIsToDoLoader(false);
      new saveAllTilesQuery().saveAllTiles(data, data);
      return data;
    },
  });
  const deleteAndSave = async (
    toSave: { color: string; id: string; createdAt: Date; updatedAt: Date }[]
  ) => {
    for (const index in toSave) {
      toSave[index]["updatedAt"] = new Date();
    }
    if (token === null) return;
    try {
      mutationSave.mutate({
        token: token,
        toSave: toSave,
        isSuccess: isSuccess,
        navigate: navigate,
      });
    } catch (err) {
      console.log(err);
    }
  };

  

  const clickSave = async () => {
    if (hasChanges) {
      const toSave = allHistory[allHistory.length - 1];
      await deleteAndSave(toSave);
      setHasChanges(false);
    }
  };

  const clickUndo = async () => {
    if (allHistory.length > 1) {
      if (hasChanges) {
        allHistory.splice(allHistory.length - 1, 1);
        setAllHistory([...allHistory]);
        setHasChanges(false);
      } else {
        const toSave = allHistory[allHistory.length - 2];
        allHistory.splice(allHistory.length - 1, 1);
        setAllHistory([...allHistory]);

        await deleteAndSave(toSave);
      }
    }
  };

  return (
    <div>
      {profile !== "viewer" ? (
        <div className="lastLine">
          <button
            className="btnUndo"
            onClick={async () => {
              if (profile !== "viewer") {
                setIsToDoLoader(true);
                await clickUndo();
                setIsToDoLoader(false);
              }
            }}
          >
            Undo
          </button>{" "}
          <button
            className="btnSave"
            onClick={async () => {
              if (profile !== "viewer") {
                setIsToDoLoader(true);
                await clickSave();
                setIsToDoLoader(false);
              }
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
