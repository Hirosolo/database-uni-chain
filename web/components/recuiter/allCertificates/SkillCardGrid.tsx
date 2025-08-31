import React from "react";
import SkillCard from "../commonShare/SkillCard";
import CardToolbar from "../commonShare/CardToolbar";
import { Certificate } from "../commonShare/allTypes";

interface SkillCardGridProps {
  certificates: Certificate[];
}

export default function SkillCardGrid({ certificates }: SkillCardGridProps) {
  return (
  <div className=""> 
    <nav className="flex items-center justify-between mb-2">
      <div className="font-bold text-lg">Bằng cấp, chứng chỉ phát hành</div>
      <button className="rounded-xl border-2 border-solid border-gray-200 px-3 py-1 text-sm font-semibold" style={{ height: '40px', color: '#04111D' }}>Tất cả</button>
    </nav>
    <CardToolbar />
    <div className="grid grid-cols-4 gap-6 mb-6">
      {certificates.map((cert, idx) => (
        <SkillCard key={idx} certificate={cert} />
      ))}
    </div>
  </div>
  );
}
