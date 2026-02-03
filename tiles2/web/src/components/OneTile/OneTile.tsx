import { getTypeColors, getTypeColorsWithStartColor } from "../../utils/ColorsServoce";
import type { TypeOneTileDict } from "../../types/typescript";
import classes from './oneTile.module.scss'
import { colorsEnum } from "../../services/Enum";
export default function OneTile({
  hasChanges,
  allArichim,
  allHistory,
  setAllHistory,
  setHasChanges,
  profile,
  index,
  color,
}: TypeOneTileDict) {
  const tileColor = color;
  const clickBin = (i: number) => {
    if (!hasChanges) {
      allArichim.splice(i, 1);
      allHistory.push(allArichim);
      const newAllHistory = [...allHistory];
      setAllHistory(newAllHistory);
      setHasChanges(true);
    } else {
      allArichim.splice(i, 1);
      const newAllHistory = [...allHistory];
      setAllHistory(newAllHistory);
    }
  };

  const changeColorIndex = (color: colorsEnum, i: number) => {
    allArichim[i]["color"] = color;

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
    <div key={index} className={getTypeColors(color)}>
      <>
        {profile !== "viewer" ? (
          <div className={classes.contentArich}>
            {Object.values(colorsEnum).map((color: colorsEnum, indexColor: number) => {
              return (
                <div className={classes.allColors} key={indexColor}>
                  {color !== tileColor ? (
                    <div key={indexColor}>
                      {indexColor === Object.values(colorsEnum).length - 1 ? (
                        <div>
                          {profile === "admin" || profile === "moderator" ? (
                            <div key={indexColor}>
                              <img
                                src="public/bin.png"
                                className={classes.myBin}
                                onClick={() => {
                                  clickBin(index);
                                }}
                              />
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {profile !== "viewer" ? (
                            <div
                              key={indexColor}
                              className={getTypeColorsWithStartColor(color)}
                              onClick={() => {
                                if (
                                  profile === "admin" ||
                                  profile === "moderator" ||
                                  profile === "editor"
                                ) {
                                  console.log('insideinsdie')
                                  changeColorIndex(color, index);
                                }
                              }}
                            ></div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </>
    </div>
  );
}
