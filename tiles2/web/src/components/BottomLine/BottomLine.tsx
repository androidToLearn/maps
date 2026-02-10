import type {
  BottomLineDictTypes,
  typePostAllTiles,
  typeTileWithString,
} from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { saveAllTilesQuery } from "../../utils/queriesTiles/SaveAllTilesQuery";
import classes from "./BottomLine.module.scss";
import { useQueryClient } from "@tanstack/react-query";

export const BottomLine = ({
  profile,
  setHasChanges,
  allHistory,
  hasChanges,
  setAllHistory,
  isSuccess,
}: BottomLineDictTypes) => {
  const queryClient = useQueryClient();

  const mutationSave = useMutation({
    mutationFn: async (data: typePostAllTiles) => {
      new saveAllTilesQuery().saveAllTiles(data, data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTiles"], // 👈 use the SAME key as your useQuery
      });
    },
    
  });
  const deleteAndSave = async (toSave: typeTileWithString[]) => {
    for (const index in toSave) {
      toSave[index]["updatedAt"] = new Date();
    }

    try {
      mutationSave.mutate({
        toSave: toSave,
        isSuccess: isSuccess,
      });
    } catch (err) {}
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
                await clickUndo();
              }
            }}
          >
            Undo
          </button>{" "}
          <button
            className={classes.btnSave}
            onClick={async () => {
              if (profile !== "viewer") {
                await clickSave();
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
