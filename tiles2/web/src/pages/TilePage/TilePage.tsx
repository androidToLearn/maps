import { useEffect, useState } from "react";
import classes from "./tilePage.module.scss";
import { useNavigate } from "react-router-dom";
import { Tile_service } from "../../services/tile_service";
import Loader from "../../components/Loader/Loader";
import { BottomLine } from "../../components/BottomLine/BottomLine";
import { useOutletContext } from "react-router";
import AllTiles from "../../components/AllTiles/AllTiles";
import Success from "../../components/Success/Success";
import { useQuery } from "@tanstack/react-query";
import { AllTilesQuery } from "../../utils/queriesTiles/AllTilesQuery";
import type { typeDictContext } from "../../types/typescript";
import { colorsEnum, type colorsEnumWithoutAdd } from "../../services/Enum";
export default function TilePage() {
  const token: string | null = localStorage.getItem("token");
  const [allHistory, setAllHistory] = useState<
    { color: colorsEnum | colorsEnumWithoutAdd | string; id: string; createdAt: Date; updatedAt: Date }[][]
  >([[{ color: colorsEnum.color1, id: "-2", createdAt: new Date(), updatedAt: new Date() }]]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isToDoLoader, setIsToDoLoader] = useState<boolean>(false);
  const tile_service = new Tile_service();
  const { profile } = useOutletContext<typeDictContext>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigator = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
  }, [isSuccess]);

  const dictValuesAllTiles = {
    allHistory: allHistory,
    setAllHistory: setAllHistory,
    setIsToDoLoader: setIsToDoLoader,
  };
  useQuery({
    queryKey: ["allTiles"],
    queryFn: () => {
      return new AllTilesQuery().allTilesFetch(dictValuesAllTiles);
    },
  });

  const allArichim = !hasChanges
    ? tile_service.getCopyLastAllHistory(allHistory)
    : allHistory[allHistory.length - 1];

  if (token === null || token === undefined) {
    navigator("/");
    return <div></div>;
  }
  if (profile === "") {
    return <div className={classes.page}>loading...</div>;
  }

  return (
    <div className={classes.page}>
      <div>
        {isToDoLoader ? (
          <Loader />
        ) : (
          <div>
            <div className={classes.scroller}>
              <div className={classes.toCenter}>
                <AllTiles
                  profile={profile}
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
                  setIsToDoLoader={setIsToDoLoader}
                  profile={profile}
                  setHasChanges={setHasChanges}
                  allHistory={allHistory}
                  hasChanges={hasChanges}
                  token={token}
                  setAllHistory={setAllHistory}
                  isSuccess={setIsSuccess}
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
