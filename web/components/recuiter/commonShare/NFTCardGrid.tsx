import React from "react";
import NFTCard from "./NFTCard";
import { Student } from "./ProjectInterface";

const NFTCardGrid = ({ student }: { student: Student }) => (
  <div className="grid grid-cols-4 gap-6 mb-6">
    {student.NFTs.map((nft, index) => (
      <NFTCard key={nft.certificateId || index} nft={nft} />
    ))}
  </div>
);

export default NFTCardGrid;
