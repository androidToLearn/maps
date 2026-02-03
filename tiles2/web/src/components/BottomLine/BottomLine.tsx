import type { BottomLineDictTypes } from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { saveAllTilesQuery } from "../../utils/queriesTiles/SaveAllTilesQuery";
import type { typeTile } from "../../types/typescript";
import type { typeMutationSaveTiles } from "../../types/typescript";
import classes from './BottomLine.module.scss'

export const BottomLine = ({
  setIsToDoLoader,
  profile,
  setHasChanges,
  allHistory,
  hasChanges,
  token,
  setAllHistory,
  isSuccess,
}: BottomLineDictTypes) => {
  const mutationSave = useMutation({
    mutationFn: async (data: typeMutationSaveTiles) => {
      setIsToDoLoader(false);
      new saveAllTilesQuery().saveAllTiles(data, data);
      return data;
    },
  });
  const deleteAndSave = async (toSave: typeTile[]) => {
    for (const index in toSave) {
      toSave[index]["updatedAt"] = new Date();
    }
    if (token === null) return;
    try {
      mutationSave.mutate({
        token: token,
        toSave: toSave,
        isSuccess: isSuccess,
      });
    } catch (err) {
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
        <div className={classes.lastLine}>
          <button
            className={classes.btnUndo}
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
            className={classes.btnSave}
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
};
