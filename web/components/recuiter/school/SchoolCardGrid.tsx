import React, { useState } from "react";
import NFTCard from "./NFTCard";
import CardToolbar from "../commonShare/CardToolbar";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";
import { school } from "./SchoolType";

type skill = {
  name: string;
  type: string;
  level: string;
  participants: number;
};

const sampleSkill: skill = {
  name: "Blockchain Development",
  type: "Bằng cấp",
  level: "Dễ",
  participants: 1000,
};

export default function SchoolCardGrid({ school }: { school: school }) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div>
      <div className="flex gap-6 px-8 mt-6">
        {showSidebar && <NFTFilterSidebar />}
        <div className="flex-1">
          <nav className="flex items-center justify-between mb-2">
            <div className="font-bold text-lg">
              Bằng cấp, chứng chỉ phát hành
            </div>
            <button
              className="rounded-xl border-2 border-solid border-gray-200 px-3 py-1 text-sm font-semibold"
              style={{ height: "40px", color: "#04111D" }}
            >
              Tất cả
            </button>
          </nav>
          <CardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
          <div className="grid grid-cols-4 gap-6 mb-6">
            {school.NFT.slice(0, school.NFT.length).map((c) => (
              <NFTCard skill={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
