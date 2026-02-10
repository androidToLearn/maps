import { useEffect, useState } from "react";
import classes from "./admin.module.scss";
import type {
  typeHistoryUser,
  typePRopertiesOneUserFromServer,
} from "../../types/typescript";
import { Admin_Service } from "../../services/admin_service";
import BottomLineAdmin from "../../components/BottomLineAdmin/BottomLineAdmin";
import Filter from "../../components/Filter/Filter";
import RowUser from "../../components/RowUser/RowUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AllUsersQuery } from "../../utils/QueryAdmin/AllUserQuery";
import Success from "../../components/Success/Success";
import { SaveAllUsers } from "../../utils/QueryAdmin/SaveAllQuery";
import { useUserContext } from "../../provider/AuthContext";
export default function adminPage() {
  const [filter, setFilter] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isAbleClickUndo, setIsAbleClickUndo] = useState<boolean>(false);
  const [arrayIdsToUpdate, setArrayIds] = useState<string[]>([]);
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

  const { isLoading, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const allUsers = await new AllUsersQuery().allUsersFetch();
      return allUsers;
    },
  });

  const mutationSetUsers = useMutation({
    mutationFn: async (data: typePRopertiesOneUserFromServer) => {
      new AllUsersQuery().getAllUsers(
        {
          allHistory: allHistory,
          setAllHistory: setAllHistory,
          setIsAbleClickUndo: setIsAbleClickUndo,
        },
        data,
      );
      return data;
    },
  });

  const { user } = useUserContext();
  if (user === null) {
    return <></>;
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
    if (data !== undefined && !isLoading) {
      if (allHistory.length === 1) {
        mutationSetUsers.mutate(data);
      }
    }
  }, [isSuccess, data, isLoading]);

  const admin_Service = new Admin_Service();
  const allUsers = !isChanged
    ? admin_Service.filterAllUsers(
        filter,
        admin_Service.copyLastHistory(allHistory),
      )
    : admin_Service.filterAllUsers(filter, allHistory[allHistory.length - 1]);

  const orderedAllUsers = new SaveAllUsers().getMyUserAndMoveToStart(
    allUsers,
    user.idUser,
  );
  const idUser = user.idUser;
  return (
    <div className={classes.page}>
      <div className={classes.main}>
        <div className={classes.content}>
          <Filter filter={filter} setFilter={setFilter} />

          <div className={classes.usersManage}>
            <div className={classes.allUsers}>
              <div className={classes.upUsersLine}>
                <p className={classes.title}>USER</p>
                <p className={classes.title}>EMAIL</p>
                <p className={classes.title}>ROLE</p>
              </div>
              <div className={classes.scrollUsers}>
                <div className={classes.usersContent}>
                  {orderedAllUsers.map((user, i) => {
                    return (
                      <RowUser
                        key={i}
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
      <div className={classes.saveSuccess}>
        {isSuccess ? <Success></Success> : <div></div>}
      </div>
      <BottomLineAdmin
        isAbleClickUndo={isAbleClickUndo}
        setIsAbleClickUndo={setIsAbleClickUndo}
        idUser={idUser}
        allHistory={allHistory}
        isChanged={isChanged}
        setAllHistory={setAllHistory}
        setIsChanged={setIsChanged}
        setIsSuccess={setIsSuccess}
        arraysIdsToUpdate={arrayIdsToUpdate}
        setArrayIdsToUpdate={setArrayIds}
      />
    </div>
  );
}
