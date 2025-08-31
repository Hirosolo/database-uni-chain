"use client";
import React from "react";
import { candidate } from "../commonShare/allTypes";
import CandidateCard from "../landingPage/CandidateCard";
import { NFTDetail } from "../commonShare/allTypes";
import data from "@/data/fetchedData.json";

const { certificates } = data;

const candidates: candidate[] = certificates.map((certificate, idx) => ({
  rank: idx + 1,
  name: "Nguyen Phat Tai",
  role: "Student", // This can be customized based on your data
  score: certificate.details.points,
  NFT: [
    {
      name: certificate.basic.name,
      ownerAddress: "Nguyen Phat Tai",
      type: "Certificate",
      status: certificate.details.isExpired ? "Expired" : "Valid",
      issuer: certificate.issuer.name ?? 'Unknown',
      issueDate: new Date(certificate.details.issueDate).toLocaleDateString(),
      expiredDate: new Date(certificate.details.expireDate).toLocaleDateString(),
      contractAddress: certificate.basic.contractAddress,
      description: 'No description',
      skills: [],
    },
  ],
}));

type school = {
  name: string;
  logoUrl: string;
};

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
              <img src={school.logoUrl} alt={school.name} className="h-5 w-6" />
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
      {[0, 5].map((startIdx) => (
        <div key={startIdx}>
          {/* Header row for each column */}
          <div className="flex items-center gap-4 mb-2 text-xs text-gray-600 font-semibold">
            <span className="">Ứng viên</span>
            <span className="ml-auto">Điểm danh tiếng</span>
          </div>

          {candidates.slice(startIdx, startIdx + 5).map((c) => (
            <CandidateCard key={c.rank} candidate={c} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default TopCandidates;
