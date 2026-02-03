import type { typePRopertiesOneUserFromServer } from './../../types/typescript';
import type { typeAllPropertiesToShowUsers } from "../../types/typescript";
import { useMutation } from "@tanstack/react-query";
import { fetchInstanceWithToken } from "../../instance/Instance";
export class AllUsersQuery {
  getAllUsers(dictValues: typeAllPropertiesToShowUsers) {
    return useMutation({
      mutationFn:async (data: typePRopertiesOneUserFromServer) => {
        const allHistory = dictValues["allHistory"];
        const setAllHistory = dictValues["setAllHistory"];
        const setIsAbleClickUndo = dictValues["setIsAbleClickUndo"];
        allHistory.splice(allHistory.length - 1, 1);
        const arrayAllUsers = [];
        for (const oneUser in data) {
          const toUser = {
            id: data[oneUser]["_id"] + "",
            name: data[oneUser]["name"] + "",
            email: data[oneUser]["email"] + "",
            password: data[oneUser]["password"] + "",
            role: data[oneUser]["role"] + "",
          };
          arrayAllUsers.push(toUser);
        }

        allHistory.push(arrayAllUsers);
        setAllHistory([...allHistory]);
        setIsAbleClickUndo(true);

        return data;
      },
    });
  }

  async allUsersFetch() {
    try {
      const response = fetchInstanceWithToken().get("/users/allUsers");
      return response;
    } catch (err) {
    }

    return null;
  }
}
