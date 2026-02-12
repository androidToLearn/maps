import { useNavigate } from "react-router-dom";
import classes from "./upline.module.scss";
import { useUserContext } from "../../provider/AuthContext";
import { useAuth } from "../../provider/useAuth";

export default function UpLine() {
  const navigator = useNavigate();

  const { addUser, logout , getUser } = useAuth();
  const {setUser} = useUserContext()
  const user = getUser()
  if (user === null) {
    navigator("/signIn");
    return <>error2</>;
  }
  if(user === undefined)
  {
    return <>error</>
  }
  const name = user.name;
  const profile = user.role;

  return (
    <div className={classes.upLine}>
      <div className={classes.userContainer}>
        <img
          src="public/p2.png"
          className={classes.imgContent}
          onClick={() => {
            logout(setUser);
            navigator("/signIn");
          }}
        />
        <div className={classes.contact}>
          <p className={classes.textUser}>{name}</p>
          <p className={classes.textProfile}>{profile}</p>
        </div>
      </div>
      <div>
        {user.isInAdmin ? (
          <div className={classes.boxInUpLine}>
            <div className={classes.upButtons}>
              <img src="public/users.png" className={classes.tiles} />
              <img
                src="public/l.png"
                className={classes.settings}
                onClick={() => {
                  user.isInAdmin = false;
                  addUser(user, setUser);
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
                      user.isInAdmin = true;
                      addUser(user, setUser);
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
