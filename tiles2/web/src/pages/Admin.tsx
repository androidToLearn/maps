import { useEffect, useState } from "react";
import "../scss/tilesPage.scss";
import "../scss/adminPage.scss";
import { useNavigate } from "react-router-dom";
import type { typeHistoryUser } from "../types/typescript";
import { Admin_Service } from "../service/admin_service";
import BottomLineAdmin from "../components/BottomLineAdmin";
import Filter from "../components/Filter";
import RowUser from "../components/RowUser";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AllUsersQuery } from "../QueryAdmin/AllUserQuery";
import Success from "../components/Success";

export default function adminPage() {
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState<number>(0);
  const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isAbleClickUndo, setIsAbleClickUndo] = useState<boolean>(false);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
  const [profile, setProfile, name, setName, idUser] =
    useOutletContext<[string, () => void, string, () => void, string]>();
  const [arrayIdsToUpdate, setArrayIds] = useState<string[]>();
  const [allHistory, setAllHistory] = useState<typeHistoryUser>([
    [
      {
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
      },
    ],
  ]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  }, [isSuccess]);

  const admin_Service = new Admin_Service();

  if (token === null) {
    navigate("/");
  }

  const mutation = new AllUsersQuery().getAllUsers({
    allHistory: allHistory,
    setAllHistory: setAllHistory,
    setIsAbleClickUndo: setIsAbleClickUndo,
  });

  useQuery({
    queryKey: ["allTiles"],
    queryFn: async () => {
      if (token !== null) {
        return new AllUsersQuery().allUsersFetch(token , mutation);
      }
    },
  });

  const allUsers = !isChanged
    ? admin_Service.filterAllUsers(
        filter,
        admin_Service.copyLastHistory(allHistory)
      )
    : admin_Service.filterAllUsers(filter, allHistory[allHistory.length - 1]);
  return (
    <div className="page">

      <div className="main">
        <div className="content">
          
            <Filter
              filter={filter}
              isScreenSmall={isScreenSmall}
              setIsMenuOpened={setIsMenuOpened}
              setFilter={setFilter}
            />
          
          <div className="usersManage">
            <div className="allUsers">
              <div className="upUsersLine">
                <p className="title">USER</p>
                <p className="title">EMAIL</p>
                <p className="title">ROLE</p>
              </div>
              <div className="scrollUsers">
                <div className="usersContent">
                  {allUsers.map((user, i) => {
                    return (
                      <RowUser
                        allUsers={allUsers}
                        isChanged={isChanged}
                        allHistory={allHistory}
                        setIsChanged={setIsChanged}
                        setAllHistory={setAllHistory}
                        myIdUser={idUser}
                        arrayIdsToUpdate={arrayIdsToUpdate}
                        setArrayIds={setArrayIds}
                        index={i}
                        user={user}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="saveSuccess">
        {isSuccess ? <Success></Success> : <div></div>}
      </div>
      <BottomLineAdmin
        isAbleClickUndo={isAbleClickUndo}
        setIsAbleClickUndo={setIsAbleClickUndo}
        token={token}
        idUser={idUser}
        allHistory={allHistory}
        isChanged={isChanged}
        setAllHistory={setAllHistory}
        setIsChanged={setIsChanged}
        isSuccess={setIsSuccess}
        arrayIdsToUpdate={arrayIdsToUpdate}
      />
    </div>
  );
}
