import { fetchInstance } from "../../../web/src/instance/Instance";

export class UserQuery {
  setUserMutate(dictValues: any) {
    try {
      fetchInstance(
        "/login/protected",
        this.doFetchUser,
        dictValues,
        JSON.stringify({}),
        "GET"
      );
    } catch (err) {
      throw { error: err };
    }
  }

  doFetchUser(data: any, dictValues: any) {
    dictValues["mutationProtected"].mutate({
      data: data,
      dictValues: dictValues,
    });
  }

  fetchUserDataById(data: any, dictValues: any) {
    data = data["id"];
    if (data["insertedId"] !== undefined) {
      data = data["insertedId"];
    }
    fetchInstance(
      "/users/userById",
      this.setData,
      dictValues,
      JSON.stringify({}),
      "GET"
    );
  }

  setData(data: any, dictValues: any) {
    dictValues["setName"](data["name"]);
    dictValues["setProfile"](data["role"]);
    dictValues["setIdUser"](data["_id"]);
    //dictValues['navigate']('/tilesPage')
  }
}
