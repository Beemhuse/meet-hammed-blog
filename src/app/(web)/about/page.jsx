import React from 'react'
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';


 function ProfileCard() {
  return (
    <div className="dark:bg-[#242535] bg-[#F6F6F7] text-white p-6 rounded-2xl max-w-3xl mx-auto text-center shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-3xl">👤</span>
        </div>
        <h2 className="mt-3 text-lg font-semibold">Hammed</h2>
        <p className="text-[#3B3C4A] dark:text-[#BABABF] text-sm">Collaborator & Editor</p>
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
    </div>
  )
}
