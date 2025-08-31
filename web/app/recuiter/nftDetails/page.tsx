"use client";
import NFTDetailsCard from "@/components/recuiter/nftDetails/NFTDetailsCard";
import NFTDetailsTabs from "@/components/recuiter/nftDetails/NFTDetailsTabs";
import NFTDetailsRelatedGrid from "@/components/recuiter/nftDetails/NFTDetailsRelatedGrid";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import data from "@/data/fetchedData.json";
import { NFTDetail } from "@/components/recuiter/commonShare/allTypes";

const { certificates } = data;

const sampleNFTDetail: NFTDetail = {
  name: certificates[0].basic.name,
  ownerAddress: "Nguyen Phat Tai",
  type: "Certificate",
  status: certificates[0].details.isExpired ? "Expired" : "Valid",
  issuer: certificates[0].issuer.name ?? 'Unknown',
  issueDate: new Date(certificates[0].details.issueDate).toLocaleDateString(),
  expiredDate: new Date(certificates[0].details.expireDate).toLocaleDateString(),
  contractAddress: certificates[0].basic.contractAddress,
  description: 'No description',
  skills: [],
};

export default function NFTDetailsPage() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen p-8 text-black">
        <div className="flex gap-6">
          <NFTDetailsCard NFTDetail={sampleNFTDetail} />
          <div className="flex-1">
            <NFTDetailsTabs NFTDetail={sampleNFTDetail}/>
          </div>
        </div>
        <div className="mt-8">
          <NFTDetailsRelatedGrid NFTDetail={sampleNFTDetail}/>
        </div>
      </div>
    </div>
  );
}
