import React from "react";
import { FaFacebook, FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineStar, AiOutlineShareAlt } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Student } from "../commonShare/ProjectInterface";

const ProfileHeader = ({ student }: { student: Student }) => (
  <section className="relative w-full mb-8">
    {/* Cover Image */}
    <div
      className="h-56 w-full bg-cover bg-center rounded-b-lg"
      style={{ backgroundImage: `url(${student.personalInformation.coverImage})` }}
    />
    {/* Avatar, Name, Subtitle, Bio, Social Icons */}
    <div className="flex items-end justify-between px-8 -mt-16 relative">
      <div className="flex flex-col items-start gap-6">
        {/* Overlapping Avatar */}
        <img
          src={student.personalInformation.avatar}
          alt="Avatar"
          className="h-32 w-32 rounded-lg border-4 border-white bg-white shadow-lg"
        />
        <div className="pb-4 py-8" style={{ color: "black" }}>
          <h1 className="text-2xl font-bold mb-2">{student.personalInformation.name}</h1>
          <div className="text-gray-600 mb-1">{student.position}</div>
          <div className="text-sm text-gray-500 max-w-xl">
            {student.personalInformation.bio}
          </div>
        </div>
      </div>
      {/* Social/Action Icons - right side */}
      <div className="flex items-center gap-6 text-xl text-black pb-12">
        <FaFacebook className="cursor-pointer hover:text-gray-600" />
        <FaDiscord className="cursor-pointer hover:text-gray-600" />
        <FaLinkedin className="cursor-pointer hover:text-gray-600" />
        <FaGithub className="cursor-pointer hover:text-gray-600" />
        <div className="h-6 w-px bg-gray-400" />
        <AiOutlineStar className="cursor-pointer hover:text-gray-600" />
        <AiOutlineShareAlt className="cursor-pointer hover:text-gray-600" />
        <BiComment className="cursor-pointer hover:text-gray-600" />
        <BsThreeDots className="cursor-pointer hover:text-gray-600" />
      </div>
    </div>
  </section>
);

export default ProfileHeader;
