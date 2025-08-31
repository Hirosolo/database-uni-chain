import React from "react";
import SkillCard from "./SkillCard";
import { skill } from "../commonShare/allTypes";

export default function AllSkillList({ skills }: { skills: skill[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center text-xs text-gray-600 font-semibold mb-2">
          <span className="ml-32">Kĩ năng</span>
          <span className="ml-130">Số lượng người học</span>
          <span className="ml-auto">Số lượng bằng cấp liên quan</span>
        </div>
        {skills.map(c => (
          <SkillCard key={c.rank} skill={c} />
        ))}
      </div>
    </div>
  );
}
