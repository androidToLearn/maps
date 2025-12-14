import "../scss/signPage.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schemaSignIn, type SignIn } from "../utils/signPageUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { SignInQuery } from "../QueriesSign/SginInQuery";
import { useMutation } from "@tanstack/react-query";
import { ProtectedQuery } from "../QueriesSign/ProtectedQuery";
import { useEffect, useState } from "react";

export default function SignIn() {
  const navigator = useNavigate();
  const [message, setMessage] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(schemaSignIn),
  });

  if (
    errors.email !== undefined ||
    errors.password !== undefined ||
    errors.root !== undefined
  ) {
    if (message == "") {
      if (errors.email !== null && errors.email !== undefined) {
        setMessage(errors.email.message);
      }
      if (errors.password !== null && errors.password !== undefined)
        setMessage(errors.password.message);
    }
  } 


  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      new SignInQuery().signMutate(data);
      return data;
    },
    retry: 3,
  });



  const mutationProtected = useMutation({
    mutationFn: (data: any) => {
      new ProtectedQuery().protectedMutate(
        { accessToken: data["accessToken"] },
        { navigate: data["navigate"] }
      );
      return data;
    },

    retry: 3,
  });

  const signAction: SubmitHandler<SignIn> = (dataFieldsForm: SignIn) => {
    mutation.mutate({
      email: dataFieldsForm["email"],
      password: dataFieldsForm["password"],
      navigate: navigator,
      mutation: mutationProtected,
      setMessage: setMessage,
    });
  };

  return (
    <div className="startDiv">
      {" "}
      <div className="main1">
        <form className="card" onSubmit={handleSubmit(signAction)}>
          <img src="public/p5.png" alt="myprofileimage" className="imageP" />

          <label htmlFor="email" className="labelSign">
            Email
          </label>
          <input
            type="email"
            className="edit"
            id="email"
            autoComplete="email"
            placeholder="email..."
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
"
            {...register("email", { required: true })}
          />
          <label htmlFor="password" className="labelSign">
            Password
          </label>
          <input
            type="password"
            className="edit"
            id="password"
            autoComplete="password"
            placeholder="password..."
            {...register("password", { required: true })}
          />
          <div className="underContentSign">
            <button
              className="orange"
              onClick={() => {
                const form = document.querySelector("form");
                if (form !== null) form.valid();
              }}
            >
              <p>SIGN IN</p>
            </button>
            <button
              className="transparnt"
              onClick={() => {
                navigate("/register");
              }}
            >
              <p>REGISTER</p>
            </button>
          </div>
          <input type="submit" id="firstsubmit" />
        </form>
      </div>
      <div>
        {message == "" ? (
          <div></div>
        ) : (
          <div className="boxMessage">
            <div className="message">{message}</div>
          </div>
        )}
      </div>
    </div>
  );
}
