import { fetchInstanceWithToken } from "../instance/Instance";
export async function getId() {
  try {
    const response = await fetchInstanceWithToken().get("/login/protected");
    return response["id"];
  } catch (err) {
    localStorage.removeItem("token");
    return { message: "bad" };
  }
}

export async function getRole() {
  try {
    const response = await fetchInstanceWithToken().get("/users/userById/");
    return response["role"];
  } catch (err) {
  }
}
