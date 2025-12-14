import { fetchInstance } from "../../../web/src/instance/Instance";

export class SaveAllUsers {
  async saveAllUsers(data: any, dictValues: any) {
    try {
      fetchInstance(
        "/user/insertAll",
        this.toDo,
        dictValues,
        JSON.stringify({ users: data["toSave"], myId: data["idUser"] }),
        "POST"
      );
    } catch (err) {
      throw { error: err };
    }
  }
  toDo(data: any, dictValues: any) {
    dictValues["setIsSuccess"](true);
  }
}
