import type { typePRopertiesOneUserFromServer } from "./../../types/typescript";
import type { typeAllPropertiesToShowUsers } from "../../types/typescript";
import { fetchInstanceWithToken } from "../../instance/Instance";
export class AllUsersQuery {
  getAllUsers(dictValues: typeAllPropertiesToShowUsers , data :typePRopertiesOneUserFromServer ) {

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
  }

  async allUsersFetch() {
    try {
      const response = await fetchInstanceWithToken().get("/users/allUsers");
      return response;
    } catch (err) {}
  }
}
