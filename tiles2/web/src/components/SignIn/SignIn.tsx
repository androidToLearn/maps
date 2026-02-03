import classes from "./signIn.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schemaSignIn, type SignIn } from "../../utils/signPageUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { SignInQuery } from "../../utils/QueriesSign/SginInQuery";
import { useMutation } from "@tanstack/react-query";
import { ProtectedQuery } from "../../utils/QueriesSign/ProtectedQuery";
import { useEffect, useState } from "react";
import type { typeDataRegister } from "../../types/typescript";
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

  const mutationProtected = useMutation({
    mutationFn: async (data: typeDataRegister) => {
      const result = await new ProtectedQuery().protectedMutate({
        accessToken: data["accessToken"],
        message: data["message"], //הציג כבר את ההודעה המתאימה אם יש
      });
      if (result === "moveBack") {
        navigate("/signIn");
      } else {
        navigate("/");
      }
      return data;
    },

    retry: 3,
  });

  const mutationSignIn = useMutation({
    mutationFn: async (data: typeSignIn) => {
      const result = await new SignInQuery().signMutate(data);
      if (result === "home") {
        navigate("/signIn");
      } else {
        if (result !== undefined) {
          mutationProtected.mutate({
            accessToken: result["accessToken"],
            message: result["message"],
          });
        }
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
    });
  };
  return (
    <div className={classes.startDiv}>
      {" "}
      <div className={classes.main1}>
        <form className={classes.card} onSubmit={handleSubmit(signAction)}>
          <div className={classes.whiteCircle}></div>
          <div className={classes.blueCircle}></div>
          <img src="public/p5.png" alt="myprofileimage" className={classes.imageP} />

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
                if (form !== null) form.valid();
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
