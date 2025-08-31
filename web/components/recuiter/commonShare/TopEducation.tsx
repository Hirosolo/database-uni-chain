"use client";
import React from "react";
import SkillCard from "./SkillCard";
import data from "@/data/fetchedData.json";

const { certificates } = data;

const education = {
  name: "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH",
  decripstion: "UIT là một trong những trường top đầu về CNTT tại Việt Nam, hơn 10.000 chứng chỉ đã được phát hành và xác thực trên hệ thống",
  location: "TP. Hồ Chí Minh",
  certificates: 10000,
  students: 10000,
  website: "https://www.uit.edu.vn/",
};

const TopEducation = () => (
  
  <section className="bg-white p-6 pb-0 rounded shadow mt-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold" style={{ color: '#707A83' }}>Đơn vị giáo dục hàng đầu</h2>
      <button onClick={ () => window.location.href='/recuiter/allSchool' } className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-4 py-2 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100 text-black">Tất cả</button>
    </div>
    <section className="pt-5 text-white p-6 pt-0 rounded shadow mt-4" style={{ background: '#005BB5'}}>
      <h2 className="text-lg font-bold mb-2">{education.name}</h2>
      <div className="mb-2">{education.decripstion}</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="">
          <div className="mb-2 font-bold">Địa điểm: {education.location}</div>
          <div className="mb-2 font-bold">Số lượng chứng chỉ phát hành: {education.certificates.toLocaleString()}</div>
          <div className="mb-2 font-bold">Số lượng sinh viên gia nhập: {education.students.toLocaleString()}</div>
          <div className="mb-2 font-bold">Website: <a href={education.website} className="underline text-white" target="_blank" rel="noopener noreferrer">{education.website}</a></div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded self-end cursor-pointer" onClick={() => window.location.href = "/recuiter/school"} style={{ color: '#FFFF' }}>Tìm hiểu thêm</button>
        </div>
        <div className="flex gap-4 mt-4">
          {certificates.map((certificate, idx) => (
            <SkillCard 
              key={idx} 
              certificate={{
                basic: {
                  contractAddress: certificate.basic.contractAddress,
                  tokenId: certificate.basic.tokenId,
                  name: certificate.basic.name,
                  symbol: certificate.basic.symbol,
                  holder: certificate.basic.holder
                },
                details: {
                  level: certificate.details.level,
                  points: certificate.details.points,
                  issueDate: certificate.details.issueDate,
                  expireDate: certificate.details.expireDate,
                  mintDate: certificate.details.mintDate,
                  isExpired: certificate.details.isExpired
                },
                issuer: {
                  address: certificate.issuer.address,
                  name: certificate.issuer.name,
                  description: certificate.issuer.description,
                  location: certificate.issuer.location,
                  website: certificate.issuer.website
                },
                metadata: {
                  tokenURI: certificate.metadata.tokenURI
                },
                blockchain: {
                  hubAddress: certificate.blockchain.hubAddress,
                  studentReputation: certificate.blockchain.studentReputation
                }
              }}
            />
          ))}
        </div>
        </div>
    </section>
  </section>
);

export default TopEducation;
