"use client";
import React from "react";
import SkillCard from "./SkillCard";
import data from "@/data/fetchedData.json";
import { skill } from "../commonShare/allTypes";

const { certificates } = data;

const skills: skill[] = certificates.map((certificate, idx) => ({
  rank: idx + 1,
  name: data.certificates[0].basic.name ?? "Unknown Skill",
  role: "Skill",
  candidates: 1, // This would need to be calculated if we had candidate data
  certificates: 1, // This is per certificate, so 1
  learner: 1,
  relatedCert: 1,
}));

const TrendSkills = () => (
  <section className="bg-white p-6 pb-0 rounded shadow mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#707A83" }}>
        Kĩ năng xu hướng
      </h2>
      <nav className="flex items-center gap-2">
        <div
          className="rounded-xl border-2 border-solid content-center"
          style={{ height: "40px" }}
        >
          <span
            className="text-sm font-medium px-2 font-semibold"
            style={{ color: "#04111D" }}
          >
            Tất cả lĩnh vực
          </span>
          <button
            className="ml-2 px-3 py-1 rounded text-sm font-semibold "
            style={{ color: "#04111D" }}
          >
            IT
          </button>
          <button
            className="ml-2 px-3 py-1 rounded text-sm font-semibold "
            style={{ color: "#04111D" }}
          >
            Tài chính
          </button>
          <button
            className="ml-2 px-3 py-1 rounded text-sm font-semibold "
            style={{ color: "#04111D" }}
          >
            Kỹ năng mềm
          </button>
          <button
            className="ml-2 px-3 py-1 rounded text-sm font-semibold "
            style={{ color: "#04111D" }}
          >
            Ngôn ngữ
          </button>
        </div>
        <button
          onClick={() => (window.location.href = "/recuiter/allSkills")}
          className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100"
          style={{ height: "40px", color: "#04111D" }}
        >
          Tất cả
        </button>
      </nav>
    </div>
    <div className="grid grid-cols-[repeat(5,minmax(150px,1fr))] gap-4 pb-4 overflow-x-hidden">
      {skills.map((c) => (
        <SkillCard key={c.rank} skill={c} />
      ))}
    </div>
  </section>
);

export default TrendSkills;
