import { useEffect, useState } from "react";
import classes from "./tilePage.module.scss";
import Loader from "../../components/Loader/Loader";
import BottomLine from "../../components/BottomLine/BottomLine";
import AllTiles from "../../components/AllTiles/AllTiles";
import Success from "../../components/Success/Success";
import { useQuery } from "@tanstack/react-query";
import { tilesService } from "../../utils/queriesTiles/AllTilesQuery";
import { useUserContext } from "../../provider/AuthContext";
import type { typeTileWithString } from "../../types/typescript";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/useAuth";

export default function TilePage() {
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { user, setUser } = useUserContext();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["allTiles"],
    queryFn: async () => {
      const result = await tilesService.allTilesFetch(setUser, logout);
      if (result === "bad") {
        navigate("/signIn");
      }
      return result;
    },
  });
  const { allHistory, setAllHistory } = useUserContext();

  const dictValuesAllTiles = {
    allHistory: allHistory,
    setAllHistory: setAllHistory,
  };

  // const {} = useMutation({
  //   mutationFn: async (data: typeTileWithString[]) => {
  //     console.log(data, "what is data");
  //     tilesService.getAllTiles(data, dictValuesAllTiles);
  //     return data;
  //   },
  // });
  if (allHistory === null) {
    return <>error allHistory</>;
  }

  useEffect(() => {
    if (data !== undefined && !isLoading && !isSuccess) {
      tilesService.getAllTiles(data, dictValuesAllTiles);
    }
  }, [isLoading, data]);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }, [isSuccess]);

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
      console.log("toSave", toSave);
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
                  setHasChanges={setHasChanges}
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
