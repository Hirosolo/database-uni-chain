"use client";
import React, { useState } from "react";
import ProfileHeader from "../../../components/recuiter/profile/ProfileHeader";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";
import NFTCardGrid from "../../../components/recuiter/profile/NFTCardGrid";
import Pagination from "../../../components/recuiter/commonShare/Pagination";
import NavBar from "../../../components/recuiter/commonShare/NavBar";
import CardToolbar from "@/components/recuiter/commonShare/CardToolbar";
import ProfileInformation from "@/components/recuiter/profile/ProfileInformation";
import { candidate, NFTDetail } from "@/components/recuiter/commonShare/allTypes";
import { sampleCandidate, sampleNFT } from "@/components/recuiter/commonShare/data";



export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen">
        <ProfileHeader candidate={sampleCandidate}/>
        <ProfileInformation candidate={sampleCandidate}/>
        <div className="flex gap-6 px-8 mt-6">
          {/* Sidebar toggle logic */}
          {showSidebar && <NFTFilterSidebar />}
          <div className="flex-1">
            <CardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
            <NFTCardGrid candidate={sampleCandidate} />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
