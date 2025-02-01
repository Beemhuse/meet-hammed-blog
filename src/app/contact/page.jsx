"use client";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { postRequest } from "@/services/postRequest";
// import toast from "react-hot-toast";
// import CircularLoader from "@/components/component/loaders/CircularLoader";
import Link from "next/link";
// import useSlideInAnimation from "@/hooks/slideAnimation";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),

//   subject: yup.string().required("Subject is required"),
//   message: yup.string().required("Message is required"),
// });
export default function Page() {
  // const [isLoading, setIsLoading] = useState(false);
  // const leftRef = useSlideInAnimation("left", 1000);
  // const rightRef = useSlideInAnimation("right", 1000, 200);
  // const {
  //   register,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     await postRequest("/api/contact", data);
  //     toast.success("Message sent successfully!");

  //     setIsLoading(false);
  //     reset();
  //   } catch (err) {
  //     setIsLoading(false);
  //     toast.error(err.message || "failed");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>

      <div className="bg-gray-100 py-16 px-6 md:px-12 lg:px-20">
        <div className="m-full mx-auto flex xl:flex-row flex-col gap-5 ">
          {/* Contact Information */}
          <div
            // ref={rightRef}
            className="xl:w-1/3 w-full p-3 flex flex-col items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-10">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="w-3 h-3 bg-red-600 rounded-full mt-1 mr-4"></span>
                    <p className="w-[2px] h-[100px] bg-[#DDDBDA] translate-x-[5px]"></p>
                  </div>
                  <div className="flex flex-col gap-8 items-left">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Location
                    </h3>
                    <p className="text-gray-600">Ghana, Gambia & Uganda</p>
                  </div>
                </li>
                <li className="flex items-start gap-10">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="w-3 h-3 bg-red-600 rounded-full mt-1 mr-4"></span>
                    <p className="w-[2px] h-[100px] bg-[#DDDBDA] translate-x-[5px]"></p>
                  </div>
                  <div className="flex flex-col gap-8 items-left">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">+233 2410-5252-6</p>
                  </div>
                </li>
                <li className="flex items-start gap-10">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="w-3 h-3 bg-red-600 rounded-full mt-1 mr-4"></span>
                  </div>
                  <div className="flex flex-col gap-8 items-left">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Email
                    </h3>
                    <p className="text-gray-600">onemapafrica@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div
            // ref={leftRef}
            className="bg-white p-8 rounded-[32px] shadow-lg w-full xl:w-2/3"
          >
            <form 
            // onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  // {...register("name")}
                  // className={`mt-2 block w-full p-3 border ${
                  //   errors.name ? "border-red-500" : "border-gray-300"
                  // } rounded-lg shadow-sm outline-none`}
                />
                {/* {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )} */}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  // {...register("email")}
                  // className={`mt-2 block w-full p-3 border ${
                  //   errors.email ? "border-red-500" : "border-gray-300"
                  // } rounded-lg shadow-sm outline-none`}
                />
                {/* {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )} */}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Your phone number"
                  // {...register("phone")}
                  // className={`mt-2 block w-full p-3 border ${
                  //   errors.phone ? "border-red-500" : "border-gray-300"
                  // } rounded-lg shadow-sm outline-none`}
                />
                {/* {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )} */}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Enter Message Subject"
                  // {...register("subject")}
                  // className={`mt-2 block w-full p-3 border ${
                  //   errors.subject ? "border-red-500" : "border-gray-300"
                  // } rounded-lg shadow-sm outline-none`}
                />
                {/* {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )} */}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your Message here"
                  rows="4"
                  // {...register("message")}
                  // className={`mt-2 block w-full p-3 border ${
                  //   errors.message ? "border-red-500" : "border-gray-300"
                  // } rounded-lg shadow-sm outline-none resize-none`}
                ></textarea>
                {/* {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )} */}
              </div>

              <button
                type="submit"
                className="w-fit py-3 px-6 bg-red-600 text-white font-medium flex justify-center items-center text-sm rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Send
                {/* {isLoading ? <CircularLoader /> : "Send"} */}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500 text-right">
              <Link href="/privacy-policy" className="text-gray-700 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
