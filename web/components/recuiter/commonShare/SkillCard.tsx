import React from "react";
import { Certificate } from "./allTypes";

interface SkillCardProps {
  certificate?: Certificate;
}

export default function SkillCard({ certificate }: SkillCardProps) {
  // If no certificate is provided, render a placeholder or return null
  if (!certificate) {
    return (
      <div className="bg-white rounded shadow p-4 flex flex-col items-center min-w-[220px] h-96 text-black cursor-pointer hover:bg-gray-200">
        <img src="/certificate.png" onClick={() => window.location.href = "/recuiter/nftDetails"} alt="NFT" className="h-54 w-full mb-2 rounded object-cover" />
        <div className="font-bold mb-1 self-start">Certificate Name</div>
        <div className="text-xs mb-1 self-start">Loại: <br></br><b>Bằng cấp</b></div>
        <div className="text-xs mb-1 self-start">Cấp độ: <br></br><b>N/A</b></div>
        <div className="text-xs mb-1 self-start">Số lượng sinh viên tham gia:<br></br> <b>N/A</b></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center min-w-[220px] h-96 text-black cursor-pointer hover:bg-gray-200">
        <img src={certificate.metadata?.image ?? "/certificate.png"} onClick={() => window.location.href = "/recuiter/nftDetails"} alt="NFT" className="h-54 w-full mb-2 rounded object-cover" />
        <div className="font-bold mb-1 self-start">{certificate.basic?.name ?? "Certificate Name"}</div>
        <div className="text-xs mb-1 self-start">Loại: <br></br><b>Bằng cấp</b></div>
        <div className="text-xs mb-1 self-start">Cấp độ: <br></br><b>{certificate.details?.level ?? "N/A"}</b></div>
        <div className="text-xs mb-1 self-start">Số lượng sinh viên tham gia:<br></br> <b>{certificate.blockchain?.studentReputation ?? "N/A"}</b></div>
    </div>
  );
}
