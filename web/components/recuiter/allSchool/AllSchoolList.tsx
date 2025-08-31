import React from "react";
import SchoolCard from "./SchoolCard";
import { school } from "../commonShare/allTypes";

export default function AllSchoolList({schools}: {schools: school[]}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center text-xs text-gray-600 font-semibold mb-2">
          <span className="ml-32">Đơn vị giáo dục</span>
          <span className="ml-145">Số lượng người học</span>
          <span className="ml-auto">Số lượng bằng cấp phát hành</span>
        </div>
        {schools.map(c => (
          <SchoolCard key={c.rank} school={c} />
        ))}
      </div>
    </div>
  );
}
