import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { schemaRegister, type register } from "../../utils/signPageUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterQuery } from "../../utils/QueriesSign/RegisterQuery";
import { useMutation } from "@tanstack/react-query";
import type { typeRegisterMutate } from "../../types/typesAllProject";
import classes from "./register.module.scss";
import { useUserContext } from "../../provider/AuthContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<register>({
    resolver: zodResolver(schemaRegister),
  });

  const [message, setMessage] = useState<string | undefined>("");

  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  const mutationRegister = useMutation({
    mutationFn: async (data: typeRegisterMutate) => {
      const response = await new RegisterQuery().registerMutate(data);
      if (response !== undefined && response !== null && response === "good") {
        navigate("/");
      }
      return data;
    },
    retry: 3,
  });
  const registerAction: SubmitHandler<register> = (
    dataFieldsForm: register,
  ) => {
    mutationRegister.mutate({
      email: dataFieldsForm["email"],
      name: dataFieldsForm["name"],
      password: dataFieldsForm["password"],
      setMessage: setMessage,
      user: user,
      setUser: setUser,
    });
  };

  return (
    <div className={classes.startDiv}>
      <div className={classes.main1}>
        <form className={classes.card} onSubmit={handleSubmit(registerAction)}>
          <div className={classes.whiteCircle}></div>
          <div className={classes.blueCircle}></div>
          <img
            src="public/p5.png"
            alt="myprofileimage"
            className={classes.imageP}
          />

          <div className={classes.divLabel}>
            <label htmlFor="email" className={classes.labelLogin}>
              Name
            </label>
            {errors.name !== undefined ? (
              <p className={classes.titleError}>{errors.name.message}</p>
            ) : (
              <div></div>
            )}
          </div>
          <input
            type="text"
            className={classes.edit}
            id="name"
            autoComplete="name"
            placeholder="name..."
            {...register("name", { required: true })}
          />
          <div className={classes.divLabel}>
            <label htmlFor="email" className={classes.labelLogin}>
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
            <label htmlFor="password" className={classes.labelLogin}>
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

          <div className={classes.underContentLogin}>
            <button
              className={classes.transparnt}
              onClick={() => {
                navigate("/signIn");
              }}
            >
              <p>LOGIN</p>
            </button>
            <button
              className={classes.orange}
              onClick={async () => {
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
          <div className={classes.boxMessage}>
            <div className={classes.message}>{message}</div>
          </div>
        )}
      </div>
    </div>
  );
}
