import React from "react";
import { Student } from "../commonShare/ProjectInterface";

const ProfileInformation = ({ student }: { student: Student }) => {
  return (
    <section className="flex items-center justify-between gap-6 px-8 mt-6">
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        <span>
          NFTs <span className="font-bold">{student.NFTs.length}</span>
        </span>
        <span>·</span>
        <span>
          Tham gia <span className="font-bold">{student.joinDate}</span>
        </span>
        <span>·</span>
        <span>
          Điểm danh tiếng{" "}
          <span className="font-bold">{student.points.toLocaleString()}</span>
        </span>
        <span>·</span>
        <span>
          Xếp hạng <span className="font-bold">#{student.rank}</span>
        </span>
      </div>
    </section>
  );
};

export default ProfileInformation;