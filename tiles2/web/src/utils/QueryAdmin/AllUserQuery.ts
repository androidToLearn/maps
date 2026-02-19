import type { typePRopertiesOneUserFromServer } from "../../types/typesAllProject";
import type { typeAllPropertiesToShowUsers } from "../../types/typesAllProject";
import { fetchInstanceWithToken } from "../../instance/Instance";
import { usersSchemaArray } from "../../typesschema/user.types";
export class AllUsersQuery {
  getAllUsers(
    dictValues: typeAllPropertiesToShowUsers,
    data: typePRopertiesOneUserFromServer,
  ) {
    const allHistory = dictValues["allHistory"];
    const setAllHistory = dictValues["setAllHistory"];
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
  }

  async allUsersFetch() {
    try {
      const response = await fetchInstanceWithToken().get("/users/allUsers");
      const result = usersSchemaArray.safeParse(response);
      if (!result.success) {
        throw Error("bad data");
      }
      return response;
    } catch (err) {}
  }
}
