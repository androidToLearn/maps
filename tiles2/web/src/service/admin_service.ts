import { useMutation } from "@tanstack/react-query";
import { SaveAllUsers } from "../QueryAdmin/SaveAllQuery";
import { useNavigate } from "react-router-dom";
import { ca } from "zod/locales";
export class Admin_Service {
  copyLastHistory(
    allHistory: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][]
  ) {
    const lastHistory = allHistory[allHistory.length - 1];
    const allUsers = [];
    for (const index in lastHistory) {
      allUsers.push({
        id: lastHistory[index]["id"],
        name: lastHistory[index]["name"],
        email: lastHistory[index]["email"],
        password: lastHistory[index]["password"],
        role: lastHistory[index]["role"],
      });
    }
    return allUsers;
  }

  filterAllUsers(
    filter: number,
    allUsersNotFiltered: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[]
  ) {
    const filteredUsers = [
      {
        id: "undefined",
        name: "undefined",
        email: "undefined",
        password: "undefined",
        role: "undefined",
      },
    ];
    filteredUsers.splice(filteredUsers.length - 1, 1);
    for (const user in allUsersNotFiltered) {
      if (
        filter === 0 ||
        (filter === 1 &&
          typeof allUsersNotFiltered[user]["role"] !== "undefined" &&
          allUsersNotFiltered[user]["role"] === "admin") ||
        (filter === 2 &&
          typeof allUsersNotFiltered[user]["role"] !== "undefined" &&
          allUsersNotFiltered[user]["role"] === "moderator") ||
        (filter === 3 && allUsersNotFiltered[user]["role"] === "editor") ||
        (filter === 4 && allUsersNotFiltered[user]["role"] === "viewer")
      ) {
        filteredUsers.push(allUsersNotFiltered[user]);
      }
    }
    return filteredUsers;
  }

  async clickSave(
    token: string,
    isChanged: boolean,
    setIsChanged: (value: boolean) => void,
    allHistory: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
    setAllHistory: (
      allHistory: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
      }[][]
    ) => void,
    setIsAbleClickUndo: (value: boolean) => void,
    idUser: string,
    setIsSuccess: (value: boolean) => void,
    arrayIdsToUpdate: string[] | undefined,
    mutationSave: any,
    navigator : any
  ) {
    if (isChanged) {
      setIsChanged(false);


      mutationSave.mutate({
        token: token,
        toSave: allHistory[allHistory.length - 1],
        setIsSuccess: setIsSuccess,
        navigate: navigator,
        arrayIdsToUpdate: arrayIdsToUpdate,
      });

      setIsAbleClickUndo(true);
    }
  }

  async clickUndo(
    allHistory: {
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    }[][],
    isChanged: boolean,
    setAllHistory: (
      value: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
      }[][]
    ) => void,
    setIsChanged: (value: boolean) => void,
    token: string,
    setIsAbleClickUndo: (value: boolean) => void,
    idUser: string,
    setIsSuccess: (value: boolean) => void,
    arrayIdsToUpdate: string[] | undefined,
    mutationSave: any,
    navigator : any
  ) {
    if (allHistory.length > 1) {
      if (!isChanged) {
        const toSave = allHistory[allHistory.length - 2];
        allHistory.splice(allHistory.length - 1, 1);
        setAllHistory([...allHistory]);

        try {
          mutationSave.mutate({
            token: token,
            toSave: allHistory[allHistory.length - 1],
            isSuccess: setIsSuccess,
            navigate: navigator,
            arrayIdsToUpdate: arrayIdsToUpdate,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        allHistory.splice(allHistory.length - 1, 1);
        setIsChanged(false);

        setAllHistory([...allHistory]);
      }
    }
    setIsAbleClickUndo(true);
  }
}
