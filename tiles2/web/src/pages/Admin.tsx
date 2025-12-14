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
import { useMutation } from "@tanstack/react-query";
import { SaveAllUsers } from "../QueryAdmin/SaveAllQuery";
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
  const navigator = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  }, [isSuccess]);

  const mutation = new AllUsersQuery().getAllUsers({
    allHistory: allHistory,
    setAllHistory: setAllHistory,
    setIsAbleClickUndo: setIsAbleClickUndo,
  });

  useQuery({
    queryKey: ["allTiles"],
    queryFn: async () => {
      if (token !== null) {
        return new AllUsersQuery().allUsersFetch(token, mutation);
      }
    },
  });

  const admin_Service = new Admin_Service();

  const mutationSave = useMutation<any>({
    mutationFn: (data: any) => {
      console.log(data);
      new SaveAllUsers().saveAllUsers(data, data);
      return data;
    },

    retry: 3,
  });

  if (token === null) {
    navigate("/");
  }

  useEffect(() => {
    if (parseFloat(window.innerWidth + "") <= 797) {
      setIsScreenSmall(true);
    } else {
      setIsScreenSmall(false);
    }
    if (isScreenSmall) setIsMenuOpened(false);
  }, []);

  const allUsers = !isChanged
    ? admin_Service.filterAllUsers(
        filter,
        admin_Service.copyLastHistory(allHistory)
      )
    : admin_Service.filterAllUsers(filter, allHistory[allHistory.length - 1]);

  const dictBottomLine = {
    isAbleClickUndo: isAbleClickUndo,
    setIsAbleClickUndo: setIsAbleClickUndo,
    token: token,
    idUser: idUser,
    allHistory: allHistory,
    isChanged: isChanged,
    setAllHistory: setAllHistory,
    setIsChanged: setIsChanged,
    setName: setName,
    setProfile: setProfile,
    navigate: navigate,
    mutation: mutationSave,
    isSuccess: setIsSuccess,
  };

  const filterDict = {
    filter: filter,
    isScreenSmall: isScreenSmall,
    setIsMenuOpened: setIsMenuOpened,
    setFilter: setFilter,
  };

  const propertiesRowUser = {
    allUsers: allUsers,
    isChanged: isChanged,
    allHistory: allHistory,
    setIsChanged: setIsChanged,
    setAllHistory: setAllHistory,
    myIdUser: idUser,
  };
  console.log("isSuccess", isSuccess);
  return (
    <div className="page">
      {isMenuOpened ? (
        <img
          className="classCloseOrOpen"
          src="public/close.png"
          onClick={() => {
            if (isScreenSmall) setIsMenuOpened(false);
          }}
        ></img>
      ) : (
        <img
          className="classCloseOrOpen"
          src="public/open.png"
          onClick={() => {
            if (isScreenSmall) setIsMenuOpened(true);
          }}
        ></img>
      )}

      <div className="main">
        <div className="content">
          {isMenuOpened ? <Filter dict={filterDict} /> : <div></div>}
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
                        properties={propertiesRowUser}
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
      <BottomLineAdmin dict={dictBottomLine} />
    </div>
  );
}
