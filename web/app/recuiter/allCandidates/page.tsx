"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllCandidatesHeader from "@/components/recuiter/allCandidates/AllCandidatesHeader";
import CandidatesToolbar from "@/components/recuiter/allCandidates/CandidatesToolbar";
import AllCandidatesList from "@/components/recuiter/allCandidates/AllCandidatesList";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import data from "@/data/fetchedData.json";
import { candidate } from "@/components/recuiter/commonShare/allTypes";

const { certificates } = data;

const candidates: candidate[] = certificates.map((certificate, idx) => ({
  rank: idx + 1,
  name: "Nguyen Phat Tai",
  role: "Student",
  score: certificate.details.points,
  NFT: [
    {
      name: certificate.basic.name,
      ownerAddress: "Nguyen Phat Tai",
      type: "Certificate",
      status: certificate.details.isExpired ? "Expired" : "Valid",
      issuer: certificate.issuer.name ?? 'Unknown',
      issueDate: new Date(certificate.details.issueDate).toLocaleDateString(),
      expiredDate: new Date(certificate.details.expireDate).toLocaleDateString(),
      contractAddress: certificate.basic.contractAddress,
      description: 'No description',
      skills: [],
    },
  ],
}));

const AllCandidates = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
        <AllCandidatesHeader />
        <div className="px-8">
            <CandidatesToolbar />
            <AllCandidatesList candidates={candidates}/>
            <Pagination />
        </div>
        </div>
    </div>
);

export default AllCandidates;
