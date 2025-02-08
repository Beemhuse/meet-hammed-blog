"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import Button from "../reusables/button"
import InputComponent from "../reusables/input"
import { Card } from "../card"
import { postRequest } from "@/services/postRequest";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
export function PublicEmptyState() {
    const [isLoading, setIsLoading] = useState(false);

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
    <Card className="max-w-2xl mx-auto my-12 p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <svg className="w-48 h-48 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke="#4F46E5"
              strokeWidth="2"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Exciting Content Coming Soon!</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We're working on amazing blog posts. Stay tuned for insightful articles and engaging stories!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Be the first to know when we publish new content:</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <InputComponent
              type="email"
              placeholder="Enter your email"
              name="email"
              register={register}
              error={errors.email?.message}
              required
              className="flex-grow"
            />
            <Button isLoading={isLoading} title='Subscribe' icon={
              <Mail className="mr-2 h-4 w-4" />

            } type="submit" className="bg-indigo-600 flex p-2 space-x-3 hover:bg-indigo-700 text-white" />
          </div>
        </form>
      </motion.div>
    </Card>
  )
}

