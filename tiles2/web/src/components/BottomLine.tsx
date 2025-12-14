import type { BottomLineType } from "../types/typescript";

export default function BottomLine({ dict }: BottomLineType) {
  const deleteAndSave = async (
    toSave: { color: string; id: string; createdAt: Date; updatedAt: Date }[] , 
  ) => {
      console.log(dict)

    for (const index in toSave) {
      toSave[index]["updatedAt"] = new Date();
    }
    if (dict["token"] === null) return;
    dict['setIsToDoLoader'](true);
    console.log(dict)
   dict['mutation'].mutate({token : dict['token'] , toSave : toSave , isSuccess : dict['isSuccess'] , 'navigate' : dict['navigate']})
  };
  const clickSave = async () => {
    console.log('save')
    if (dict["hasChanges"]) {
      console.log(dict["allHistory"]);

      const toSave = dict["allHistory"][dict["allHistory"].length - 1];
      await deleteAndSave(toSave);
      dict['setHasChanges'](false);
    }
  };

  const clickUndo = async () => {
    if (dict["allHistory"].length > 1) {
      if (dict["hasChanges"]) {
        dict["allHistory"].splice(dict["allHistory"].length - 1, 1);
        dict["setAllHistory"]([...dict["allHistory"]]);
        dict["setHasChanges"](false);
      } else {
        const toSave = dict["allHistory"][dict["allHistory"].length - 2];
        dict["allHistory"].splice(dict["allHistory"].length - 1, 1);
        dict["setAllHistory"]([...dict["allHistory"]]);
        
        await deleteAndSave(toSave);
      }
    }
  };

  return (
    <div>
      {dict["profile"] !== "viewer" ? (
        <div className="lastLine">
          <button
            className="btnUndo"
            onClick={async () => {
              if (dict["profile"] !== "viewer") {
                dict["setIsToDoLoader"](true);
                await clickUndo();
                dict["setIsToDoLoader"](false);
              } else {
                console.log("not able");
              }
            }}
          >
            Undo
          </button>{" "}
          <button
            className="btnSave"
            onClick={async () => {
              if (dict["profile"] !== "viewer") {
                dict["setIsToDoLoader"](true);
                await clickSave();
                dict["setIsToDoLoader"](false);
              } else {
                console.log("not able");
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
}
