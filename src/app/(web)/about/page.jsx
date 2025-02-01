import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function ProfileCard() {
  return (
    <div className="dark:bg-[#242535] bg-[#F6F6F7] text-white p-6 rounded-2xl max-w-3xl mx-auto text-center shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-3xl">👤</span>
        </div>
        <h2 className="mt-3 text-lg font-semibold">Hammed</h2>
        <p className="text-[#3B3C4A] dark:text-[#BABABF] text-sm">
          Collaborator & Editor
        </p>
      </div>
      <p className="mt-4 text-[#3B3C4A] dark:text-[#BABABF] text-sm">
        Meet Jonathan Doe, a passionate writer and blogger with a love for
        technology and travel. Jonathan holds a degree in Computer Science and
        has spent years working in the tech industry, gaining a deep
        understanding of the impact technology has on our lives.
      </p>
      <div className="mt-4 flex justify-center space-x-3">
        <a href="#" className="p-2 bg-[#696A75] rounded-lg hover:bg-gray-700">
          <FaGithub size={18} className="text-white" />
        </a>
        <a href="#" className="p-2 bg-[#696A75] rounded-lg hover:bg-gray-700">
          <FaTwitter size={18} className="text-white" />
        </a>
        <a href="#" className="p-2 bg-[#696A75] rounded-lg hover:bg-gray-700">
          <FaInstagram size={18} className="text-white" />
        </a>
        <a href="#" className="p-2 bg-[#696A75] rounded-lg hover:bg-gray-700">
          <FaYoutube size={18} className="text-white" />
        </a>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <div>
      <ProfileCard />

      <div className=" py-16 px-6 md:px-12 lg:px-20">
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
                    <p className="text-gray-600">Lagos Nigeria</p>
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
                    <p className="text-gray-600">+234 2410-5252-6</p>
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
                    <p className="text-gray-600">test@gmail.com</p>
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
              className="space-y-6"
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}
