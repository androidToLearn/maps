import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../scss/fisrt.scss";
import UpLine from "../components/UpLine";
import { UserQuery } from "../QueriesProtected/UserQuery";
import { useMutation } from "@tanstack/react-query";

export default function Content() {

  
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [idUser, setIdUser] = useState("");
  const dictUser = { name: name, profile: profile };
  const navigator = useNavigate();
  const mutationProtected = useMutation({
    mutationFn: (myData: any) => {
      console.log(myData)
      new UserQuery().fetchUserDataById(myData["data"], myData["dictValues"]);
      return myData;
    },
    retry: 3,
  });

  const mutationUserAndProfile = useMutation({
    mutationFn: (myData: any) => {
      new UserQuery().setUserMutate(myData);
      return myData;
    },
    retry: 3,
  });
  if(window.location.href === import.meta.env.VITE_BASE_URL_FRONTEND)
  navigator('/tilePage')
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    if (token !== undefined && token !== null) {
      mutationUserAndProfile.mutate({
        setName: setName,
        setProfile: setProfile,
        mutationProtected: mutationProtected,
        setIdUser: setIdUser,
        navigate: navigator,
      });
    }
  }, []);
  return (
    <div>
      <UpLine user={dictUser} />

      <Outlet context={[profile, setProfile, name, setName, idUser]} />
    </div>
  );
}
