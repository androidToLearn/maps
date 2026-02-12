import { useEffect, useState } from "react";
import classes from "./tilePage.module.scss";
import { Tile_service } from "../../services/tile_service";
import Loader from "../../components/Loader/Loader";
import BottomLine from "../../components/BottomLine/BottomLine";
import AllTiles from "../../components/AllTiles/AllTiles";
import Success from "../../components/Success/Success";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AllTilesQuery } from "../../utils/queriesTiles/AllTilesQuery";
import { colorsEnum, type colorsEnumWithoutAdd } from "../../services/Enum";
import { useUserContext } from "../../provider/AuthContext";
import type { typeTileWithString } from "../../types/typescript";
import { useNavigate } from "react-router-dom";

export default function TilePage() {
  const [allHistory, setAllHistory] = useState<
    {
      color: colorsEnum | colorsEnumWithoutAdd | string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
    }[][]
  >([
    [
      {
        color: colorsEnum.color1,
        id: "-2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ]);

  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const tile_service = new Tile_service();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["allTiles"],
    queryFn: async () => {
      return await new AllTilesQuery().allTilesFetch();
    },
  });

  const dictValuesAllTiles = {
    allHistory: allHistory,
    setAllHistory: setAllHistory,
  };

  const mutationShowTiles = useMutation({
    mutationFn: async (data: typeTileWithString[]) => {
      new AllTilesQuery().getAllTiles(data, dictValuesAllTiles);
      return data;
    },
  });

  const allArichim = !hasChanges
    ? tile_service.getCopyLastAllHistory(allHistory)
    : allHistory[allHistory.length - 1];

  useEffect(() => {
    if (data !== undefined && !isLoading && !isSuccess) {
      mutationShowTiles.mutate(data);
    }
  }, [isLoading, data]);

  useEffect(()=>{
    setTimeout(()=>{
      setIsSuccess(false)
    } , 2000)
  } , [isSuccess])

  if (user === undefined || user === null) {
    return <></>;
  }

  if (user.role === "") {
    return <div className={classes.page}>loading...</div>;
  }
  if (user.isInAdmin) {
    navigate("/adminPage");
  }

  const deleteAndSave = async (toSave: typeTileWithString[]) => {
    for (const index in toSave) {
      toSave[index]["updatedAt"] = new Date();
    }
  };

  const clickSave = async () => {
    if (hasChanges) {
      const toSave = allHistory[allHistory.length - 1];
      await deleteAndSave(toSave);
      setHasChanges(false);
      return toSave;
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
        return toSave;
      }
    }
  };

  const profile = user.role;
  return (
    <div className={classes.page}>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className={classes.scroller}>
              <div className={classes.toCenter}>
                <AllTiles
                  profile={user.role}
                  hasChanges={hasChanges}
                  allHistory={allHistory}
                  setAllHistory={setAllHistory}
                  setHasChanges={setHasChanges}
                  allArichim={allArichim}
                />
              </div>
            </div>
            <div>
              {profile === "admin" ||
              profile === "moderator" ||
              profile == "editor" ? (
                <BottomLine
                  saveFunction={clickSave}
                  undoFunction={clickUndo}
                  setIsSuccess={setIsSuccess}
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className={classes.saveSuccess}>
              {isSuccess ? <Success></Success> : <div></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
