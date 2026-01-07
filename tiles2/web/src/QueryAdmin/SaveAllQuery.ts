import { fetchInstance } from "../../../web/src/instance/Instance";
import type { TypeUsersToSave } from "../types/typescript";

export class SaveAllUsers {
  async saveAllUsers(data: any, dictValues: any) {

    const theUsersToSave = this.getUsersToSave(data["toSave"] , data['arrayIdsToUpdate'])
    try {
      fetchInstance(
        "/users/insertAll",
        this.toDo,
        dictValues,
        JSON.stringify({ users: theUsersToSave, myId: data["idUser"] }),
        "POST"
      );
    } catch (err) {
      throw { error: err };
    }
  }
  toDo(data: any, dictValues: any) {
    dictValues["setIsSuccess"](true);
  }

  getUsersToSave(toSave : TypeUsersToSave, arrayIdsToUpdate : string[] | undefined){
    const toSaveUsers = []
    for(const i in toSave){
      const oneUserToSave = toSave[i]
      if (arrayIdsToUpdate !== undefined && oneUserToSave['id'] in arrayIdsToUpdate)
      {
        toSaveUsers.push(oneUserToSave)
      }
    }
    return toSaveUsers
  }
}
