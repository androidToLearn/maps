import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { typeUser } from "../types/typescript";

export default function UpLine({ user }: typeUser) {
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);
  const navigator = useNavigate();
  return (
    <div className="upLine">
      <div className="userContainer">
        <img
          src="public/p2.png"
          className="imgContact"
          onClick={() => {
            localStorage.removeItem("token");
            navigator("/signIn");
          }}
        />
        <div className="contact">
          <p className="textUser">{user["name"]}</p>
          <p className="textProfile">{user["profile"]}</p>
        </div>
      </div>
      <div>
        {isAdminPage ? (
          <div className="boxInUpLine">
            <div className="upButtons">
              <img src="public/users.png" className="tiles" />
              <img
                src="public/l.png"
                className="settings"
                onClick={() => {
                  setIsAdminPage(false);
                  navigator("/tilePage");
                }}
              ></img>
            </div>
          </div>
        ) : (
          <div className="boxInUpLine">
            <div className="upButtons">
              {user["profile"] === "admin" ? (
                <img
                  src="public/users.png"
                  className="settings"
                  onClick={() => {
                    if (user["profile"] === "admin") {
                      setIsAdminPage(true);
                      navigator("/adminPage");
                    }
                  }}
                />
              ) : (
                <div></div>
              )}

              <img src="public/l.png" className="tiles"></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
