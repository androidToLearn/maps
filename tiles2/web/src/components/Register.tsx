import "../scss/signPage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { schemaRegister, type register } from "../utils/signPageUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterQuery } from "../QueriesSign/RegisterQuery";
import { useMutation } from "@tanstack/react-query";
import { ProtectedQuery } from "../QueriesSign/ProtectedQuery";

export default function Register() {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<register>({
    resolver: zodResolver(schemaRegister),
  });

  console.log({ errors });

  const [message, setMessage] = useState<string | undefined>("");

  const navigate = useNavigate();

  const mutationProtected = useMutation({
    mutationFn: (data: any) => {
      new ProtectedQuery().protectedMutate(data, data);
      return data;
    },

    retry: 3,
  });
  const mutation = useMutation({
    mutationFn: (data: any) => {
      new RegisterQuery().registerMutate(data, data);
      return data;
    },
    retry: 3,
  });
  const registerAction: SubmitHandler<register> = (
    dataFieldsForm: register
  ) => {
    mutation.mutate({
      email: dataFieldsForm["email"],
      name: dataFieldsForm["name"],
      password: dataFieldsForm["password"],
      mutation: mutationProtected,
      navigate: navigator,
      setMessage: setMessage,
    });
  };

  return (
    <div className="startDiv">
      <div className="main1">
        <form className="card" onSubmit={handleSubmit(registerAction)}>
          <div className="whiteCircle"></div>
          <div className="blueCircle"></div>
          <img src="public/p5.png" alt="myprofileimage" className="imageP" />

          <div className="divLabel">
            <label htmlFor="email" className="labelLogin">
              Name
            </label>
            {errors.name !== undefined ? <p className="titleError">{errors.name.message}</p>:<div></div>}
          </div>
          <input
            type="text"
            className="edit"
            id="name"
            autoComplete="name"
            placeholder="name..."
            {...register("name", { required: true })}
          />
          <div className="divLabel">
            <label htmlFor="email" className="labelLogin">
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
            <label htmlFor="password" className="labelLogin">
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

          <div className="underContentLogin">
            <button
              className="transparnt"
              onClick={() => {
                navigate("/signIn");
              }}
            >
              <p>LOGIN</p>
            </button>
            <button
              className="orange"
              onClick={async () => {
                console.log("clicked");
                console.log(errors);
                const form = document.querySelector("form");
                if (form !== null) form.valid();
              }}
            >
              <p>REGISTER</p>
            </button>
          </div>
          <input type="submit" id="submit" />
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
