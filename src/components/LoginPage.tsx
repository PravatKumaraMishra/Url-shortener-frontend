import { useForm } from "react-hook-form";
import Field from "./Field";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import useTokenStore from "../hooks/Store";

export default function LoginPage() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useTokenStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    setLoader(true);
    api
      .post("/auth/login", data)
      .then((res) => {
        setToken(res.data.token);
        navigate("/dashboard");
        reset();
        toast.success("Login successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoader(false);
        console.log(token);
      });
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
          Login Here
        </h1>
        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">
          <Field
            label="Email"
            id="email"
            type="email"
            register={register}
            required
            message="Email is required"
            placeholder="Enter your email"
            errors={errors}
            autocomplete="email"
          />
          <Field
            label="Password"
            id="password"
            type="password"
            register={register}
            required
            message="Password is required"
            placeholder="Enter your password"
            errors={errors}
            autocomplete="current-password"
            min={6}
          />
        </div>
        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
        >
          {loader ? "Logging In..." : "Login"}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span className="text-btnColor"> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
