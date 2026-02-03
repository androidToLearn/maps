import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpLine from "../../components/UpLine/UpLine";
import { UserQuery } from "../../utils/QueriesProtected/UserQuery";
import { useMutation } from "@tanstack/react-query";
import type { dictValuesUserInsert } from "../../types/typescript";
import type { typeNothing } from "../../types/typescript";

export default function Content() {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [isInAdmin, setIsInAdmin] = useState(false);
  const navigator = useNavigate();
  if (localStorage.getItem("token") === "undefined") {
    localStorage.removeItem("token");
  }

  const navigate = useNavigate();
  const mutationUserAndProfile = useMutation({
    mutationFn: async (myData: dictValuesUserInsert) => {
      const response = await new UserQuery().fetchUserDataById(myData);
      if (response === "bad") {
        navigate("/signIn");
      }
      return myData;
    },
    retry: 3,
  });
  const mutationProtected = useMutation({
    mutationFn: async (myData: typeNothing) => {
      const response = await new UserQuery().setUserMutate();
      if (response === undefined) {
        navigate("/signIn");
      } else {
        mutationUserAndProfile.mutate({
          setName: setName,
          setProfile: setProfile,
          setIdUser: setIdUser,
        });
      }

      return myData;
    },

    retry: 3,
  });

  if (window.location.href === import.meta.env.VITE_BASE_URL_FRONTEND)
    navigator("/tilePage");
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    if (token !== undefined && token !== null) {
      mutationProtected.mutate({});
    }
  }, []);
  return (
    <div>
      <UpLine name={name} profile={profile} setIsInAdmin = {setIsInAdmin} isInAdmin = {isInAdmin} />

      <Outlet
        context={{
          profile: profile,
          setProfile: setProfile,
          name: name,
          setName: setName,
          idUser: idUser
        }}
      />
    </div>
  );
}
