import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerHandler = (data: any) => {
    console.log(data);
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom rounded-md py-8 px-4 sm:px-4"
      >
        <h1 className="text-center font-serif text-2xl text-btnColor font-bold lg:text-3xl">
          Register Here
        </h1>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <Field
            label="Name"
            id="username"
            type="text"
            errors={errors}
            register={register}
            required
            message="Username is required"
            placeholder="Enter your username"
          />
          <Field
            label="Email"
            id="email"
            type="email"
            errors={errors}
            register={register}
            required
            message="Email is required"
            placeholder="Enter your email"
          />
          <Field
            label="Password"
            id="password"
            type="password"
            errors={errors}
            register={register}
            required
            message="Password is required"
            placeholder="Enter your password"
          />
        </div>
        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white py-2 bg-custom-gradient w-full hovor:text-slate-400 transition-colors duration-300 rounded-sm my-3"
        >
          {loader ? "Loading..." : "Register"}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hovor:text-black"
            to="/login"
          >
            <span className="text-btnColor">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
