"use client";
import React from "react";
import SkillCard from "@/components/recuiter/commonShare/SkillCard";
import {
  Issuer,
  Certificate,
  Skill,
  SkillOfCertificate,
  studentPersonalInformation,
  Student
} from "@/components/recuiter/commonShare/ProjectInterface";

const TopEducation = ({ issuer, certificates, participants }: {issuer: Issuer, certificates: Certificate[], participants: number}) => (
  
  <section className="bg-white p-6 pb-0 rounded shadow mt-6 mb-5 pb-4">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold" style={{ color: '#707A83' }}>Đơn vị giáo dục hàng đầu</h2>
      <button onClick={ () => window.location.href='/recuiter/allSchool' } className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-4 py-2 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100 text-black">Tất cả</button>
    </div>
    <section className="pt-5 text-white p-6 pt-0 rounded shadow mt-4" style={{ background: '#005BB5'}}>
      <h2 className="text-lg font-bold mb-2">{issuer.issuerName}</h2>
      <div className="mb-2">{issuer.description}</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="">
          <div className="mb-2 font-bold">Địa điểm: {issuer.location}</div>
          <div className="mb-2 font-bold">Số lượng chứng chỉ phát hành: {participants.toLocaleString()}</div>
          <div className="mb-2 font-bold">Số lượng sinh viên gia nhập: {participants.toLocaleString()}</div>
          <div className="mb-2 font-bold">Website: <a href={issuer.social[0]} className="underline text-white" target="_blank" rel="noopener noreferrer">{issuer.social[0]}</a></div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded self-end cursor-pointer" onClick={() => window.location.href = "/recuiter/school"} style={{ color: '#FFFF' }}>Tìm hiểu thêm</button>
        </div>
        <div className="flex gap-4 mt-4">
          {certificates.slice(0, 3).map((cert, idx: number) => (
            <SkillCard key={idx} cert={cert} />
          ))}
        </div>
        </div>
    </section>
  </section>
);

export default TopEducation;
