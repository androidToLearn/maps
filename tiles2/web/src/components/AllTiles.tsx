import { getColorsForChoose } from "../utils/tilePageUtils";
import { useState } from "react";
import OneTile from "./OneTile";

export default function AllTiles({ properties }: any) {
  const chooseColor = getColorsForChoose();
  const [isColorsOpened, setIsOpenedColor] = useState<boolean>(false);

  const profile = properties["profile"];
  const allArichim = properties["allArichim"];
  const hasChanges = properties["hasChanges"];
  const allHistory = properties["allHistory"];
  const setAllHistory = properties["setAllHistory"];
  const setHasChanges = properties["setHasChanges"];

  

  const clickChooseColor = () => {
    setIsOpenedColor(true);
  };

  const clickColor = (color: string) => {
    const lastIsAdd = allArichim[allArichim.length - 1];
    allArichim.splice(allArichim.length - 1, 1);
    allArichim.push({
      color: color,
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }); //-1 is new still not have id
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

  const dictTypeOneTile = {
    hasChanges: hasChanges,
    allArichim: allArichim,
    allHistory: allHistory,
    setAllHistory: setAllHistory,
    setHasChanges: setHasChanges,
    profile: profile,
  };
  return (
    <div className="allArichim">
      {allArichim.map((tile: any, i: number) => {
        return (
          <div key={i}>
            {i === allArichim.length - 1 ? (
              <>
                {profile === "moderator" || profile === "admin" ? (
                  <div key={i} className="arichAdd">
                    {isColorsOpened ? (
                      <div className="allColors">
                        {chooseColor.map((color, indexColor) => {
                          return (
                            <div
                              key={indexColor}
                              style={{ backgroundColor: color }}
                              className="color"
                              onClick={() => {
                                if (
                                  profile === "admin" ||
                                  profile === "moderator"
                                ) {
                                  clickColor(color);
                                }
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <img className="addArich"
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
                properties={dictTypeOneTile}
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
