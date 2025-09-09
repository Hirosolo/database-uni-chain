"use client";
import React from "react";
import { candidate } from "../commonShare/allTypes";
import CandidateCard from "../landingPage/CandidateCard";
import { school } from "../commonShare/allTypes";
import {sampleSchool, sampleCandidate}  from "@/components/recuiter/commonShare/data"
import { array } from "zod";

const TopCandidates = ({ school }: { school: school }) => (
  <section className="bg-white p-6 rounded shadow mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold" style={{ color: "#707A83" }}>
        Ứng viên hàng đầu
      </h2>
      <nav className="flex items-center gap-2">
        <div
          className="rounded-xl border-2 border-solid flex"
          style={{ height: "40px" }}
        >
          <span
            className="text-sm font-medium px-3 font-semibold self-center"
            style={{ color: "#04111D" }}
          >
            Tất cả trường đại học
          </span>
          {[...Array(5)].map((_, i) => (
            <button
              key={`logo-btn-${i}`}
              className="ml-2 py-1 rounded flex items-center justify-center"
            >
              <img src={school.logo} alt={school.name} className="h-5 w-6" />
            </button>
          ))}
        </div>
        <button
          onClick={() => (window.location.href = "/recuiter/allCandidates")}
          className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100"
          style={{ height: "40px", color: "#04111D" }}
        >
          Tất cả
        </button>
      </nav>
    </div>
    <div className="grid grid-cols-2 gap-26">
      {Array.from({length:1}).map((j)=>(
        <div key={1}>
          <div className="flex items-center gap-4 mb-2 text-xs text-gray-600 font-semibold">
            <span className="">Ứng viên</span>
            <span className="ml-auto">Điểm danh tiếng</span>
          </div>

          {Array.from({length:5}).map((_,i)=>(
            <CandidateCard key={i} candidate={{...sampleCandidate, rank: i +1}}/>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default TopCandidates;
