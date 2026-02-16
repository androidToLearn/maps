import classes from "./signIn.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schemaSignIn, type SignIn } from "../../utils/signPageUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { SignInQuery } from "../../utils/QueriesSign/SginInQuery";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUserContext } from "../../provider/AuthContext";
import type { typeSignIn } from "../../types/typescript";

export default function SignIn() {
  const [message, setMessage] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(schemaSignIn),
  });
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('a' , window.location.href)
    if (user !== null) {
      navigate("/tilePage");
    }
  }, [user]);

  const mutationSignIn = useMutation({
    mutationFn: async (data: typeSignIn) => {
      const result = await new SignInQuery().signMutate(data);
      if (result === "home") {
        navigate("/signIn");
      } else {
        navigate("/");
      }
      return data;
    },
    retry: 3,
  });

  const signAction: SubmitHandler<SignIn> = (dataFieldsForm: SignIn) => {
    mutationSignIn.mutate({
      email: dataFieldsForm["email"],
      password: dataFieldsForm["password"],
      setMessage: setMessage,
      user: user,
      setUser: setUser,
    });
  };

  return (
    <div className={classes.startDiv}>
      {" "}
      <div className={classes.main1}>
        <form className={classes.card} onSubmit={handleSubmit(signAction)}>
          <div className={classes.whiteCircle}></div>
          <div className={classes.blueCircle}></div>
          <img
            src="public/p5.png"
            alt="myprofileimage"
            className={classes.imageP}
          />

          <div className={classes.divLabel}>
            <label htmlFor="email" className={classes.labelSign}>
              Email
            </label>
            {errors.email !== undefined ? (
              <p className={classes.titleError}>{errors.email.message}</p>
            ) : (
              <div></div>
            )}
          </div>
          <input
            type="email"
            className={classes.edit}
            id="email"
            autoComplete="email"
            placeholder="email..."
            {...register("email", { required: true })}
          />
          <div className={classes.divLabel}>
            <label htmlFor="password" className={classes.labelSign}>
              Password
            </label>
            {errors.password !== undefined ? (
              <p className={classes.titleError}>{errors.password.message}</p>
            ) : (
              <div></div>
            )}
          </div>
          <input
            type="password"
            className={classes.edit}
            id="password"
            autoComplete="password"
            placeholder="password..."
            {...register("password", { required: true })}
          />
          <div className={classes.underContentSign}>
            <button
              className={classes.orange}
              onClick={() => {
                const form = document.querySelector("form");
                if (form !== null) {
                  form.valid();
                }
              }}
            >
              <p>LOGIN</p>
            </button>
            <button
              className={classes.transparnt}
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
          <div className={classes.boxMessage}>
            <div className={classes.message}>{message}</div>
          </div>
        )}
      </div>
    </div>
  );
}
