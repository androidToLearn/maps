import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export class AllUsersQuery {
   getAllUsers(dictValues: any) {
    return useMutation<any>({
      mutationFn: (data: any) => {

        
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

  async allUsersFetch(token: string, mutation: any) {
    const response = await axios("http://localhost:3000/users/allUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    try{
    mutation.mutate(response.data);
    }catch(err)
    {
      console.log(err)
    }

    return response.data;
  }
}
