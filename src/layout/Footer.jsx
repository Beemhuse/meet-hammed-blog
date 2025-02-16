"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import { postRequest } from "@/services/postRequest";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { fetchCategories } from "@/services/apiService";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  useEffect(()=>{
async function getCategories()  {
  
  const data = await fetchCategories()
  setCategories(data)
}
getCategories();
  }, [])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevents the page from refreshing

    setIsLoading(true);
    try {
      const res = await postRequest("/api/newsletter", data);
      toast.success(res.message);
      setIsLoading(false);
      reset();
    } catch (err) {
      setIsLoading(false);
      toast.error(err || "Failed");
      reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="bg-gray-100 dark:bg-inherit py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* About Section */}
        <div className="dark:text-[#97989F]">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-sm dark:text-[#97989F] text-gray-600 mb-4">
            Hamed, a young entrepreneur with a passion for media and technology,
            embarked on his entrepreneurial journey with Media Cartel, a brand
            that swiftly gained traction for its creative and forward-thinking
            approach to digital media.
          </p>
          <p className="text-sm dark:text-[#97989F] text-gray-600">
            <span className="font-semibold">Email:</span> otunhamed@gmail.com
          </p>
          <div className="flex mt-4 gap-4 items-center">
            <Link
              href="https://x.com/hmdofcartel"
              target={"_blank"}
              className="border p-2 rounded-full"
            >
              <FiTwitter />
            </Link>
            <Link
              href="https://www.instagram.com/hmdofcartel"
              target={"_blank"}
              className="border p-2 rounded-full"
            >
              <FiInstagram />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="dark:text-[#97989F]">
          <h3 className="text-xl dark:text-[#97989F] font-semibold mb-4">
            Quick Link
          </h3>
          <ul className="space-y-2 text-sm dark:text-[#97989F] text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl dark:text-[#97989F] font-semibold mb-4">
            Category
          </h3>
          <ul className="space-y-2 text-sm dark:text-[#97989F] text-gray-600">
            {
              categories?.slice(0,6).map((category) => (
                <li key={category._id}>
                  <Link href={`/blog/?category=${category.slug.current}`}>
                      {category.title}
                  </Link>
                </li>
              )) || <Loading />
            }
          
          
          </ul>
        </div>

        {/* Newsletter */}
        <div className="dark:bg-[#242535] bg-white p-4">
          <h3 className="text-xl font-semibold mb-4 dark:text-white text-center">
            Weekly Newsletter
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center dark:text-[#97989F]">
            Get blog articles and offers via email.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
            >
              {isLoading ? <Loading /> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">
          MeetHammed &copy; by Bright 2025. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
            Terms of Use
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
