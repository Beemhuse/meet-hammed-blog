"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Button from "@/components/reusables/button";
import { Card } from "@/components/card";
import { useRouter } from "next/navigation";

export function EmptyState() {
  const [isHovered, setIsHovered] = useState(false);
const {push} = useRouter()
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center h-[400px] bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <motion.div
        className="mb-6"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          className="w-48 h-48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12 4V20M20 12H4"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="#8B5CF6"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        No Posts Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        It seems you haven't created any blog posts yet. Start sharing your
        thoughts with the world!
      </p>
      <Button
        icon={<PlusCircle className="mr-2 h-5 w-5" />}
        title={"        Create Your First Post     "}
        onMouseEnter={() => setIsHovered(true)}
        onClick={()=> push("/a-dashboard/manage-account")}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-purple-600 flex items-center gap-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
      />
    </Card>
  );
}
