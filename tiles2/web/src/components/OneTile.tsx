import { getColors } from "../utils/tilePageUtils";
import { getTypeColors } from "../utils/ColorsServoce";
import type { TypeOneTileDict } from "../types/typescript";
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
  const allColors = getColors();
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

  const changeColorIndex = (color: string, i: number) => {
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
    <div key={index} className={`tile${getTypeColors(color)}`}>
      <>
        {profile !== "viewer" ? (
          <div className="contentArich">
            {allColors.map((color: string, indexColor: number) => {
              return (
                <div className="allColors" key={indexColor}>
                  {color !== tileColor ? (
                    <div key={indexColor}>
                      {indexColor === allColors.length - 1 ? (
                        <div>
                          {profile === "admin" || profile === "moderator" ? (
                            <div key={indexColor}>
                              <img
                                src="public/bin.png"
                                className="myBin"
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
                              className={`color${getTypeColors(color)}`}
                              onClick={() => {
                                if (
                                  profile === "admin" ||
                                  profile === "moderator" ||
                                  profile === "editor"
                                ) {
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
