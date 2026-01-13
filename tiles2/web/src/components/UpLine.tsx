import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TypeUpLineDict } from "../types/typescript";

export default function UpLine({ name, profile }: TypeUpLineDict) {
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);
  if (localStorage.getItem("isInAdmin") == "true" && !isAdminPage) {
    setIsAdminPage(true)
  } 
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
          <p className="textUser">{name}</p>
          <p className="textProfile">{profile}</p>
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
                  localStorage.setItem("isInAdmin", "false");
                }}
              ></img>
            </div>
          </div>
        ) : (
          <div className="boxInUpLine">
            <div className="upButtons">
              {profile === "admin" ? (
                <img
                  src="public/users.png"
                  className="settings"
                  onClick={() => {
                    if (profile === "admin") {
                      setIsAdminPage(true);
                      navigator("/adminPage");
                      localStorage.setItem("isInAdmin", "true");
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
