import Button from "@/components/reusables/button";
import InputComponent from "@/components/reusables/input";
import Typography from "@/components/reusables/typography";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className=" h-screen  flex items-center justify-center">
      <div className="max-w-lg w-full ">
       
        <form
        //   onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 bg-white p-10 rounded-lg shadow-md"
          method="post"
        >
          <Typography variant="h1" size="lg" className="text-center">
            Forgot Password
          </Typography>
          <InputComponent
            label="Email"
            type="email"
            placeholder="Enter your email"
            borderStyle="bottom"
            name="email"
            // register={register}
            // error={errors.email?.message}
          />
       
          <Typography
            variant="h2"
            size="sm"
            className="text-start text-accent my-2"
          >
            <Link href='/a-admin/login'>
            Back to login?
            </Link>
          </Typography>

          <Button
            title="Submit"
            color="gray"
            type="submit"
            // isLoading={loading}
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
