import React from "react";
import { Certificate } from "./ProjectInterface";

const NFTCard = ({ nft }: { nft: Certificate }) => (
    <div className="bg-white rounded-xl shadow p-6 w-96">
      <img
        src="/certificate.png"
        alt="NFT"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="font-bold text-lg mb-2 text-black">{nft.certificateName}</div>
      <div className="text-xs mb-1 text-gray-500">Owner</div>
      <div className="font-mono text-sm mb-2 text-black">{nft.ownerAddress}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500">Type</span>
        <span className="font-bold text-black">{nft.type}</span>
        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
          Valid
        </span>
      </div>
      <div className="text-xs mb-1 text-gray-500">Issuer</div>
      <div className="font-bold text-sm mb-2 text-black">{nft.issuerName}</div>
      <div className="text-xs mb-1 text-gray-500">Issue date</div>
      <div className="font-bold text-sm mb-2 text-black">{nft.issuedDate}</div>
      <div className="text-xs mb-1 text-gray-500">Expired date</div>
      <div className="font-bold text-sm mb-2 text-black">{nft.expiryDate || 'None'}</div>
      <div className="text-xs mb-1 text-gray-500">Contract</div>
      <div className="font-mono text-sm mb-2 flex items-center gap-2 text-black">
        {nft.certificateAddress}{" "}
        <a href="#" className="text-gray-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M14 3h7v7m-1.414-5.586L10 14.414M5 19h7v-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
);

export default NFTCard;
