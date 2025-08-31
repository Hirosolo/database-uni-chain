"use client";
import SkillHeader from "@/components/recuiter/skill/SkillHeader";
import SkillCardGrid from "@/components/recuiter/skill/SkillCardGrid";
import SkillTopEducation from "@/components/recuiter/skill/SkillTopEducation"
import NavBar from "@/components/recuiter/commonShare/NavBar";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import React, { useState } from "react";
import { skill, skillInfo, school } from "@/components/recuiter/skill/SkillType";
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

const sampleSkillInfo: skillInfo = {
  name: certificates[0].metadata.skills ?? "Unknown Skill",
  description:
    "Blockchain Development là kỹ năng xây dựng và triển khai các ứng dụng phi tập trung (Dapps), hợp đồng thông minh (smart contracts) và hệ thống blockchain. Người sở hữu kỹ năng này có khả năng hiểu rõ các nguyên lý hoạt động của blockchain, nắm vững ngôn ngữ lập trình như Solidity, Rust hoặc có thể áp dụng vào các lĩnh vực như DeFi, NFT, hay quản trị dữ liệu phi tập trung.",
  NFT: Array.from({ length: 8 }).map(() => sampleSkill),
  participants: 5000, // This would need to be calculated
};

export default function SkillPage() {
  
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SkillHeader skillInfo={sampleSkillInfo}/>
        <div className="px-8">
          <SkillCardGrid skill={sampleSkillInfo.NFT} />
          <Pagination />
          <SkillTopEducation school={sampleSchool}/>
        </div>
      </div>
    </div>
  );
}
