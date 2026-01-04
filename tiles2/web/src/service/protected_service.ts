import axios from "axios";
export async function getId() {
  try {
    const response = await axios("http://localhost:3000/login/protected", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data["id"];
  } catch (err) {
    localStorage.removeItem("token");
    return { message: "bad" };
  }
}

export async function getRole() {
  try {
    const response = await axios("http://localhost:3000/users/userById/", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data["role"];
  } catch (err) {
    localStorage.removeItem("token");

    return { message: "bad" };
  }
}
