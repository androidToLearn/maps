import type { TypeInsideMutationSave } from "../../types/typescript";
import type { TypeUsersToSave } from "../../types/typescript";
import { fetchInstanceWithToken } from "../../instance/Instance";
import type { isSuccessType } from "../../types/typescript";

export class SaveAllUsers {
  async saveAllUsers(data: TypeInsideMutationSave, dictValues: isSuccessType) {
    const theUsersToSave = this.getUsersToSave(
      data["toSave"],
      data["arrayIdsToUpdate"],
    );

    const contentUsersToSave = { users: theUsersToSave, myId: data["idUser"] };
    await fetchInstanceWithToken().post("/users/insertAll", contentUsersToSave);
    dictValues["setIsSuccess"](true);
  }

  getUsersToSave(
    toSave: TypeUsersToSave,
    arrayIdsToUpdate: string[] | undefined,
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
    return toSaveUsers;
  }
}
