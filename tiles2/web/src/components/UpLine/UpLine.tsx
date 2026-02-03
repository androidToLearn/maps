import { useNavigate } from "react-router-dom";
import type { TypeUpLineDict } from "../../types/typescript";
import classes from "./upline.module.scss";

export default function UpLine({ name, profile , setIsInAdmin , isInAdmin }: TypeUpLineDict) {
 
  const navigator = useNavigate();
  return (
    <div className={classes.upLine}>
      <div className={classes.userContainer}>
        <img
          src="public/p2.png"
          className={classes.imgContent}
          onClick={() => {
            localStorage.removeItem("token");
            navigator("/signIn");
          }}
        />
        <div className={classes.contact}>
          <p className={classes.textUser}>{name}</p>
          <p className={classes.textProfile}>{profile}</p>
        </div>
      </div>
      <div>
        {isInAdmin ? (
          <div className={classes.boxInUpLine}>
            <div className={classes.upButtons}>
              <img src="public/users.png" className={classes.tiles} />
              <img
                src="public/l.png"
                className={classes.settings}
                onClick={() => {
                  setIsInAdmin(false);
                  navigator("/tilePage");
                }}
              ></img>
            </div>
          </div>
        ) : (
          <div className={classes.boxInUpLine}>
            <div className={classes.upButtons}>
              {profile === "admin" ? (
                <img
                  src="public/users.png"
                  className={classes.settings}
                  onClick={() => {
                    if (profile === "admin") {
                      setIsInAdmin(true);
                      navigator("/adminPage");
                    }
                  }}
                />
              ) : (
                <div></div>
              )}

              <img src="public/l.png" className={classes.tiles}></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
