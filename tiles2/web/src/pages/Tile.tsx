import { useEffect, useState } from "react";
import "../scss/tilesPage.scss";
import { useNavigate } from "react-router-dom";
import { Tile_service } from "../service/tile_service";
import Loader from "../components/Loader";
import BottomLine from "../components/BottomLine";
import { useOutletContext } from "react-router";
import { AllTilesQuery } from "../queriesTiles/AllTilesQuery";
import AllTiles from "../components/AllTiles";
import { useQuery } from "@tanstack/react-query";
//import { UserQuery } from "../QueriesProtected/UserQuery";
import { useMutation } from "@tanstack/react-query";
import { saveAllTilesQuery } from "../queriesTiles/SaveAllTilesQuery";
import Success from "../components/Success";
export default function TilePage() {
  const token: string | null = localStorage.getItem("token");

  const [allHistory, setAllHistory] = useState<
    { color: string; id: string; createdAt: Date; updatedAt: Date }[][]
  >([[{ color: "", id: "-2", createdAt: new Date(), updatedAt: new Date() }]]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isToDoLoader, setIsToDoLoader] = useState<boolean>(true);
  const tile_service = new Tile_service();
  const [profile, setProfile, name, setName, idUser] =
    useOutletContext<[string, () => void, string, () => void, string]>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigator = useNavigate();

  

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

  const mutationSave = useMutation<any>({
    mutationFn: (data: any) => {
      new saveAllTilesQuery().saveAllTiles(data, data);
      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
  }, [isSuccess]);

  const allArichim = !hasChanges
    ? tile_service.getCopyLastAllHistory(allHistory)
    : allHistory[allHistory.length - 1];

  if (token === null || token === undefined) {
    navigator("/");
    return <div></div>;
  }

  const dictBottomLine = {
    name: name,
    setIsToDoLoader: setIsToDoLoader,
    profile: profile,
    setHasChanges: setHasChanges,
    allHistory: allHistory,
    hasChanges: hasChanges,
    token: token,
    setAllHistory: setAllHistory,
    navigate: navigator,
    mutation: mutationSave,
    isSuccess: setIsSuccess,
  };

  const dictPropertiesAllTiles = {
    profile: profile,
    hasChanges: hasChanges,
    allHistory: allHistory,
    setAllHistory: setAllHistory,
    setHasChanges: setHasChanges,
    allArichim: allArichim,
  };

  if(profile === '')
  {
    return <div className="page">loading...</div>
  }
  return (
    <div className="page">
      <div>
        {isToDoLoader ? (
          <Loader />
        ) : (
          <div>
            <div className="scroller">
              <div className="toCenter">
                <AllTiles properties={dictPropertiesAllTiles} />
              </div>
            </div>
            <div>
              {profile === "admin" ||
              profile === "moderator" ||
              profile == "editor" ? (
                <BottomLine dict={dictBottomLine} />
              ) : (
                <div></div>
              )}
            </div>
            <div className="saveSuccess">
              {isSuccess ? <Success></Success> : <div></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
