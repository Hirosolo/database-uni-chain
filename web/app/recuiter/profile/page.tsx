"use client";
import React, { useState } from "react";
import ProfileHeader from "@/components/recuiter/profile/ProfileHeader";
import NFTFilterSidebar from "@/components/recuiter/commonShare/NFTFilterSidebar";
import NFTCardGrid from "@/components/recuiter/commonShare/NFTCardGrid";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import CardToolbar from "@/components/recuiter/commonShare/CardToolbar";
import ProfileInformation from "@/components/recuiter/profile/ProfileInformation";
import { sampleCertificates, sampleStudents } from "@/components/recuiter/commonShare/SampleData";
import { Certificate, Student, FilterKey } from "@/components/recuiter/commonShare/ProjectInterface";

export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    type: new Set(["Degree"]),
    education: new Set<string>(),
    level: new Set<string>(),
  });

  const handleFilterChange = (
    filterType: FilterKey,
    value: string,
    checked: boolean
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev } as typeof prev;
      if (filterType === "type") {
        newFilters[filterType] = new Set([value]);
      } else {
        const filterSet = new Set(prev[filterType]);
        if (checked) {
          filterSet.add(value);
        } else {
          filterSet.delete(value);
        }
        newFilters[filterType] = filterSet;
      }
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setActiveFilters({
      type: new Set(["Degree"]),
      education: new Set<string>(),
      level: new Set<string>(),
    });
  };

  const filteredCertificates = sampleCertificates.filter((cert: Certificate) => {
    const typeMatch =
      activeFilters.type.size === 0 || activeFilters.type.has(cert.type);
    return typeMatch;
  });

  const studentWithFilteredCerts: Student = {
    ...sampleStudents[0],
    NFTs: filteredCertificates,
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen">
        <ProfileHeader student={sampleStudents[0]} />
        <ProfileInformation student={sampleStudents[0]} />
        <div className="flex gap-6 px-8 mt-6">
          {showSidebar && (
            <NFTFilterSidebar
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
            />
          )}
          <div className="flex-1">
            <CardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
            <NFTCardGrid student={studentWithFilteredCerts} />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}


