import { Certificate } from '@/components/recuiter/commonShare/ProjectInterface';

export default function SkillCard({ cert, rank }: { cert: Certificate; rank?: number }) {
  return (
    <div
      onClick={() => (window.location.href = "/recuiter/skill")}
      className="min-w-[210px] bg-white rounded p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200"
    >
      <img src="/certificate.png" alt="NFT" className="h-54 w-full mb-2 rounded object-cover" />
      <div className="font-semibold mb-1 self-start overflow-x-hidden">
        {rank !== undefined ? `#${rank} ` : ''}{cert.certificateName}
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
}
