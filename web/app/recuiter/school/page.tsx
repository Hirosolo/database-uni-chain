"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SchoolCardGrid from "@/components/recuiter/school/SchoolCardGrid";
import SchoolTopStudents from "@/components/recuiter/school/SchoolTopStudents";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import { school, student, skill } from "@/components/recuiter/school/SchoolType";
import data from "@/data/fetchedData.json";

const { certificates } = data;

const sampleSkill: skill = {
  name: certificates[0].basic.name,
  type: "Certificate",
  level: certificates[0].details.level.toString(),
  participants: certificates[0].blockchain.studentReputation,
};

const sampleSchool: school = {
  name: certificates[0].issuer.name ?? "Unknown Issuer",
  logoUrl: "/logo-UIT.svg",
  address: certificates[0].issuer.location ?? "Unknown Location",
  NFT: Array.from({ length: 8 }).map(() => sampleSkill),
  participants: 5000, // This would need to be calculated
  description: certificates[0].issuer.description ?? "No description",
  skills: 101, // This would need to be calculated
};

const sampleStudents: student[] = certificates.map((certificate) => ({
  name: "Nguyen Phat Tai",
  role: "Student",
  certificates: 1, // This is per certificate, so 1
}));

export default function SchoolPage() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SchoolHeader school={sampleSchool} />
        <div className="px-8">
          <SchoolCardGrid school={sampleSchool}/>
          <Pagination />
          <SchoolTopStudents students={sampleStudents}/>
        </div>
      </div>
    </div>
  );
}
