import { Issuer, Certificate, Skill, SkillOfCertificate, studentPersonalInformation, Student, NFTFilters  } from "@/components/recuiter/commonShare/ProjectInterface"

const CandidateItem = ({ student, rank }: { student: Student; rank: number }) => (
  <div
    className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-gray-100 rounded px-2"
    style={{ color: "#707A83" }}
    onClick={() => (window.location.href = "/recuiter/profile")}
  >
    <span className="font-bold w-4">{rank}</span>
    <img src="/avatar-user2.png" alt="Avatar" className="h-8 w-8" />
    <div>
      <div className="font-semibold" style={{ color: "#04111D" }}>
        {student.personalInformation.name}
      </div>
      <div className="text-xs" color="#707A83">
        {student.position}
      </div>
    </div>
    <div className="ml-auto font-bold" style={{ color: "#04111D" }}>
      {student.points.toLocaleString()}
    </div>
  </div>
);

export default CandidateItem;
