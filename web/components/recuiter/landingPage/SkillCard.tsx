import { Issuer, Certificate, Skill, SkillOfCertificate, studentPersonalInformation, Student, NFTFilters  } from "@/components/recuiter/commonShare/ProjectInterface";


const SkillCard = ({ cert, rank }: { cert: Certificate; rank: number }) => (
  <div
    onClick={() => (window.location.href = "/recuiter/skill")}
    className="min-w-[210px] bg-gray-100 rounded p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200"
  >
    <div
      className="font-semibold mb-1 self-start overflow-x-hidden"
      style={{ color: "#000000" }}
    >
      #{rank} <br></br> {cert.certificateName}
    </div>
    <div className="text-xs text-gray-500 self-start">
      Loại:
      <div className="font-bold" style={{ color: "#000000" }}>
        {cert.type}
      </div>
    </div>
    <div className="text-xs text-gray-500 self-start">
      Cấp độ:
      <div className="font-bold" style={{ color: "#000000" }}>
        {cert.level}
      </div>
    </div>
    <div className="text-xs text-gray-500 self-start">
      Điểm:
      <div className="font-bold" style={{ color: "#000000" }}>
        {cert.points.toLocaleString()}
      </div>
    </div>
  </div>
);

export default SkillCard;