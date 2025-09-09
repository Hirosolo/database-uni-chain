import { school, candidate, NFT } from "./allTypes";
import data from "@/data/fetchedData.json";

export const sampleNFT: NFT = data;

export const sampleSchool: school = {
  rank: 1,
  name: data.certificates[0].issuer.name,
  role: "University",
  candidates: 1000,
  certificates: 500,
  logo: "/logo-UIT.svg",
};

function getCertificateType(level: number): "Certificate" | "Degree" | "Award" | "Credit" {
    switch (level) {
      case 1: return "Certificate";
      case 2: return "Degree";
      case 3: return "Award";
      case 4: return "Credit";
      default: throw new Error("Invalid level");
    }
  }

export const sampleCandidate: candidate = {
  rank: 1,
  name: "Tong Thuan Nguyen",
  role: "Student",
  cerPoints: data.summary.totalCertificatePoints,
  repuPoints: data.summary.totalReputationPoints,
  NFT: data.certificates.map(cert => ({
    name: cert.basic.name,
    ownerAddress: cert.basic.holder,
    type: getCertificateType(cert.details.level),
    status: cert.details.isExpired ? "Expired" : "Active",
    issuer: cert.issuer.name,
    issueDate: cert.details.issueDate,
    expiredDate: cert.details.expireDate,
    contractAddress: cert.basic.contractAddress,
    description: cert.issuer.description,
    skills: [cert.basic.name]
  })),
  description:
    "Bạn mê về blockchain và phát triển smart contract. Đã hoàn thành nhiều chứng chỉ về Solidity, Web3 và DeFi. Đang tìm kiếm cơ hội để áp dụng kỹ năng kỹ thuật vào các dự án thực tế.",
};
