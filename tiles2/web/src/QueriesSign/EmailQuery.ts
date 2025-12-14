import { fetchInstance } from "./../instance/Instance";

export class EmailQuery {
  async emailMutate(data: any, dictValues: any) {
    try{
    fetchInstance(
      "/allUsers",
      this.doValidationIfGoodEmail,
      dictValues,
      JSON.stringify({}),
      "GET"
    );
  }
  catch(err)
  {
    throw({'error' : err})
  }
  }

  doValidationIfGoodEmail(data: any, dictValues: any) {
    if (!this.isEmailAppear(data, dictValues)) {
     
    }
  }

  isEmailAppear(data: any, dictValues: any) {
    for (const index in data) {
      if (data[index]["email"] === dictValues["email"]) {
        return true;
      }
    }
    return false;
  }
}
