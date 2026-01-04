
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export class GetRoleQuery {
  async getRoleMutate(data: any) {
    const mutation = useMutation<any>({
      mutationFn:async (data: any) => {
        await axios(
          "/users/userById/" + data['id'],
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        ).then((response) => {
           return response.data['role']
        });

        return data;
      },

      retry: 3,
    });

    mutation.mutate(data);
  }
}
