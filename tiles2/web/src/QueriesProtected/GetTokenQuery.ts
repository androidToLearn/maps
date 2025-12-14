import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export class GetTokenQuery {
  async getTokenMutate(data: any, email: string) {
    const mutation = useMutation<any>({
      mutationFn: async(data: any) => {
        try {
          const response = await axios(
            "/login/protected",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          return response.data["id"]["userId"];
        } catch (err) {
          return null;
        }
      },

      retry: 3,
    });

    mutation.mutate(data);
  }
}
