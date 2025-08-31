"use client";
import AllCertificatesHeader from "@/components/recuiter/allCertificates/AllCertificatesHeader"
import SkillCardGrid from "@/components/recuiter/allCertificates/SkillCardGrid";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import data from "@/data/fetchedData.json";

const { certificates } = data;

export default function SchoolPage() {
  return (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <AllCertificatesHeader />
        <div className="px-8">
            <SkillCardGrid certificates={certificates} />
            <Pagination />
        </div>
        </div>
    </div>
  );
}
