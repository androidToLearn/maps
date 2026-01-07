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
  console.log(errors.email)
  return (
    <div className="startDiv">
      {" "}
      <div className="main1">
        <form className="card" onSubmit={handleSubmit(signAction)}>
          <div className="whiteCircle"></div>
          <div className="blueCircle"></div>
          <img src="public/p5.png" alt="myprofileimage" className="imageP" />

          <div className="divLabel">
            <label htmlFor="email" className="labelSign">
              Email
            </label>
            {errors.email !== undefined ? <p className="titleError">{errors.email.message}</p>:<div></div>}
          </div>
          <input
            type="email"
            className="edit"
            id="email"
            autoComplete="email"
            placeholder="email..."
            {...register("email", { required: true })}
          />
          <div className="divLabel">
            <label htmlFor="password" className="labelSign">
              Password
            </label>
            {errors.password !== undefined ? <p className="titleError">{errors.password.message}</p>:<div></div>}
          </div>
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
              <p>LOGIN</p>
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
