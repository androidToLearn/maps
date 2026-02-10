import type {
  typeDictUser,
  TypeInsideMutationSave,
} from "../../types/typescript";
import type { TypeUsersToSave } from "../../types/typescript";
import { fetchInstanceWithToken } from "../../instance/Instance";
import type { isSuccessType } from "../../types/typescript";

export class SaveAllUsers {
  async saveAllUsers(data: TypeInsideMutationSave, dictValues: isSuccessType) {
    const theUsersToSave = this.getUsersToSave(
      data["toSave"],
      data["arrayIdsToUpdate"],
      data['setArrayIdsToUpdate']
    );

    const contentUsersToSave = { users: theUsersToSave, myId: data["idUser"] };
    await fetchInstanceWithToken().post("/users/insertAll", contentUsersToSave);
    dictValues["setIsSuccess"](true);
  }

  getUsersToSave(
    toSave: TypeUsersToSave,
    arrayIdsToUpdate: string[] | undefined,
    setArrayIdsToUpdate : (value : string[]) => void
  ) {
    const toSaveUsers = [];
    for (const i in toSave) {
      const oneUserToSave = toSave[i];
      if (
        arrayIdsToUpdate !== undefined &&
        arrayIdsToUpdate.includes(oneUserToSave["id"])
      ) {
        toSaveUsers.push(oneUserToSave);
      }
    }
    setArrayIdsToUpdate([])
    return toSaveUsers;
  }

  getMyUserAndMoveToStart(allUsers: typeDictUser[], idUser: string) {
    const theUsers = []
    for (const oneUserIndex in allUsers) {
      if (allUsers[oneUserIndex]["id"] === idUser) {
        const myUser = allUsers[oneUserIndex];
        theUsers.push(myUser)
        break
      }
    }
    for (const oneUserIndex in allUsers) {

      if (allUsers[oneUserIndex]["id"] !== idUser) {
        const otherUser = allUsers[oneUserIndex];
        theUsers.push(otherUser)
      }
    }
    return theUsers
  }
}
