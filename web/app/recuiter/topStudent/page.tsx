"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SkillCardGrid from "@/components/recuiter/allCertificates/SkillCardGrid";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import TopStudentList from "@/components/recuiter/topStudent/TopStudentList";
import {
  school,
  student,
  skill,
} from "@/components/recuiter/topStudent/TopStudentType";
import data from "@/data/fetchedData.json";

const { certificates } = data;

const sampleSkill: skill = {
  name: certificates[0].basic.name,
  type: "Certificate",
  level: certificates[0].details.level.toString(),
  participants: certificates[0].blockchain.studentReputation,
};

const sampleStudent: student = {
  name: "Nguyen Phat Tai",
  role: "Student",
  certificates: 1,
  NFT: Array.from({ length: 8 }).map(() => sampleSkill),
};

const sampleSchool: school = {
  name: certificates[0].issuer.name ?? "Unknown Issuer",
  logoUrl: "/logo-UIT.svg",
  address: certificates[0].issuer.location ?? "Unknown Location",
  NFT: Array.from({ length: 8 }).map(() => sampleSkill),
  participants: 5000, // This would need to be calculated
  description: certificates[0].issuer.description ?? "No description",
  skills: 101, // This would need to be calculated
  students: Array.from({ length: 10 }).map(() => sampleStudent),
};

export default function topStudent() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SchoolHeader school={sampleSchool} />
        <div className="px-8">
          <TopStudentList student={sampleSchool.students} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}
