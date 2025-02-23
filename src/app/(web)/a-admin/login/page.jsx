"use client";
import Button from "@/components/reusables/button";
import InputComponent from "@/components/reusables/input";
import Typography from "@/components/reusables/typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postRequest } from "@/services/postRequest";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup.string().required("Subject is required"),
});
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const cookie = new Cookies();
  const { push } = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const cookieOptions = {
      secure: true, // Only send cookie over HTTPS
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      sameSite: "Strict", // Prevents CSRF attacks
      path: "/", // Available across the entire domain
      maxAge: 60 * 60 * 24 * 1, // 1 day expiration
    };
    try {
      const res = await postRequest("/api/login", data);
      toast.success("User signed in successfully!");
      cookie.set("mb-token", res.token, cookieOptions);
      cookie.set("mb-id", res.user.id, cookieOptions);
      setIsLoading(false);
      reset();
      push("/a-dashboard");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className=" h-screen  flex items-center justify-center">
      <div className="max-w-lg w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 bg-white p-10 rounded-lg shadow-md"
          method="post"
        >
          <Typography variant="h1" size="lg" className="text-center dark:text-black">
            Login to Dashboard
          </Typography>
          <InputComponent
            label="Email"
            type="email"
            placeholder="Enter your email"
            borderStyle="bottom"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <InputComponent
            label="Password"
            type="password"
            placeholder="Enter your password"
            password
            borderStyle="bottom"
            name="password"
            register={register}
            error={errors.password?.message}
          />
          <Typography
            variant="h2"
            size="sm"
            className="text-start text-accent my-2"
          >
            <Link href={'/a-admin/forgot-password'}>
            Forgot Password?
            </Link>
          </Typography>

          <Button
            title="Login"
            color="gray"
            type="submit"
            isLoading={isLoading}
          />
          {/* <div className="flex justify-center -mt-2 mb-10 items-center">
            <Typography variant="body" size="sm" className="text-center">
              Forgot password?
            </Typography>
            <span className="text-accent">Signup</span>
          </div> */}
        </form>
      </div>
    </section>
  );
}
