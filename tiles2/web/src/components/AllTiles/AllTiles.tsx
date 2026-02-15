import { useState } from "react";
import OneTile from "../OneTile/OneTile";
import { arrayColorsEnum } from "../../services/Enum";
import type {
  TypeAllTilesProperties,
  typeTileWithString,
} from "../../types/typescript";
import { getTypeColorsWithStartColorWithOutAdd } from "../../utils/ColorsServoce";
import classes from "./allTiles.module.scss";
import { colorsEnumWithoutAdd } from "../../services/Enum";
import { Tile_service } from "../../services/tile_service"; 
import { useUserContext } from "../../provider/AuthContext";

export default function AllTiles({
  profile,
  hasChanges,
  setHasChanges,
}: TypeAllTilesProperties) {
  const [isColorsOpened, setIsOpenedColor] = useState<boolean>(false);

  const clickChooseColor = () => {
    setIsOpenedColor(true);
  };

  const {allHistory , setAllHistory} = useUserContext()
  if(allHistory === null)
  {
    return <>error allHistory</>
  }
  const allArichim = !hasChanges
      ? new Tile_service().getCopyLastAllHistory(allHistory)
      : allHistory[allHistory.length - 1];
  if(allArichim === undefined)
  {
    return <>error all tiles</>
  }
  const clickColor = (color: colorsEnumWithoutAdd) => {
    const lastIsAdd = allArichim[allArichim.length - 1];
    allArichim.splice(allArichim.length - 1, 1);
    if (arrayColorsEnum.includes(color)) {
      allArichim.push({
        color: color,
        id: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }); //-1 is new still not have id
    } else {
      return;
    }
    allArichim.push(lastIsAdd);
    setIsOpenedColor(false);

    if (!hasChanges) {
      
      allHistory.push(allArichim);
      const newAllHistory = [...allHistory];
      setAllHistory(newAllHistory);
      setHasChanges(true);
    } else {
      
      const newAllHistory = [...allHistory];
      setAllHistory(newAllHistory);
    }
  };

  return (
    <div className={classes.allArichim}>
      {allArichim.map((tile: typeTileWithString, i: number) => {
        return (
          <div key={i}>
            {i === allArichim.length - 1 ? (
              <>
                {profile === "moderator" || profile === "admin" ? (
                  <div key={i} className={classes.arichAdd}>
                    {isColorsOpened ? (
                      <div className={classes.allColors}>
                        {Object.values(colorsEnumWithoutAdd).map(
                          (color: colorsEnumWithoutAdd, indexColor: number) => {
                            return (
                              <div
                                key={indexColor}
                                className={getTypeColorsWithStartColorWithOutAdd(
                                  color,
                                )}
                                onClick={() => {
                                  if (
                                    profile === "admin" ||
                                    profile === "moderator"
                                  ) {
                                    console.log("inside");
                                    clickColor(color);
                                  }
                                }}
                              ></div>
                            );
                          },
                        )}
                      </div>
                    ) : (
                      <img
                        className={classes.addArich}
                        src="public/addArich.png"
                        onClick={() => {
                          if (profile === "admin" || profile === "moderator") {
                            clickChooseColor();
                          }
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <OneTile
                hasChanges={hasChanges}
                allArichim={allArichim}
                setHasChanges={setHasChanges}
                profile={profile}
                index={i}
                color={tile["color"]}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
