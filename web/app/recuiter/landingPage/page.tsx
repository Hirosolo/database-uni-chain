"use client";
import React from "react";
import NavBar from "../../../components/recuiter/commonShare/NavBar";
import TopCandidates from "../../../components/recuiter/landingPage/TopCandidates";
import TrendSkills from "../../../components/recuiter/landingPage/TrendSkills";
import TopEducation from "@/components/recuiter/commonShare/TopEducation";
import data from "@/data/fetchedData.json";

const { certificates } = data;

const sampleSchool = {
  name: certificates[0].issuer.name ?? "Unknown Issuer",
  logoUrl: "/logo-UIT.svg" // You might want to add a logo URL to your data
};

const LandingPage = () => (
  <div className="bg-gray-50 min-h-screen">
    <NavBar />
    <main className="max-w-6xl mx-auto">
      <section className="bg-blue-700 text-white p-8 rounded-2xl mt-8 h-80 flex flex-col justify-between" style={{ background: '#005BB5' }}>
        <h1 className="text-2xl font-bold mb-4">Khám phá và xác thực năng lực thực sự của ứng viên</h1>
        <ul className="list-disc ml-6 mb-4">
          <li>Chứng chỉ minh bạch, xác thực trên blockchain</li>
          <li>Nơi lưu trữ hồ sơ học tập, kỹ năng, thành tích đáng tin cậy</li>
          <li>Giúp tiết kiệm thời gian sàng lọc ứng viên</li>
        </ul>
        <button className="bg-white text-blue-700 px-6 py-2 rounded font-semibold self-end cursor-pointer" onClick = {() => window.location.href='/recuiter/allCandidates' } style={{background: '#FFFFFF3D', color: "#FFFFFF"}}>Khám phá hồ sơ ứng viên</button>
      </section>
      <TopCandidates school={sampleSchool}/>
      <TrendSkills />
      <TopEducation />
    </main>
  </div>
);

export default LandingPage;
