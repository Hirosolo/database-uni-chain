import React from "react";

const courses = [
  {
    title: "Web3 Basics",
    desc: "Web3 Basics is the introductory course in this series...",
    level: "Dễ",
    org: "UIT",
  },
  {
    title: "Solidity 101",
    desc: "Introducing Solidity 101 – the first intro-level...",
    level: "Dễ",
    org: "UIT",
  },
  {
    title: "Introduction to Rust",
    desc: "This Rust basics course will guide you...",
    level: "Dễ",
    org: "UIT",
  },
  {
    title: "Move 101",
    desc: "In this course, we will explore Move's packages...",
    level: "Dễ",
    org: "UIT",
  },
  {
    title: "Decentralized Social Dapp",
    desc: "In this course, you will learn how to build...",
    level: "Trung bình",
    org: "UIT",
  },
  {
    title: "Introduction to Rust",
    desc: "This course will teach you how to build...",
    level: "Khó",
    org: "UIT",
  },
];

export default function StudentCourseGrid() {
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg mb-2 text-black">
          CÁC KHÓA HỌC ĐƯỢC CHỨNG NHẬN
        </h2>
        <div className="flex justify-end gap-3 mb-4">
          <div className="rounded-xl border-2 border-solid content-center">
            <button
              className="text-sm font-medium px-2 font-semibold"
              style={{ color: "#04111D" }}
            >
              Tất cả lĩnh vực
            </button>
            <button
              className="text-sm font-medium px-2 font-semibold"
              style={{ color: "#04111D" }}
            >
              IT
            </button>
            <button
              className="text-sm font-medium px-2 font-semibold"
              style={{ color: "#04111D" }}
            >
              Tài chính
            </button>
            <button
              className="text-sm font-medium px-2 font-semibold"
              style={{ color: "#04111D" }}
            >
              Kỹ năng mềm
            </button>
            <button
              className="text-sm font-medium px-2 font-semibold"
              style={{ color: "#04111D" }}
            >
              Ngôn ngữ
            </button>
          </div>
          <button className="p-2 rounded rounded-md bg-blue-400 text-white px-5">
            Bắt đầu học ngay
          </button>
        </div>
      </div>

      {/* Certificates */}
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-1">{c.title}</div>
            <div className="text-xs mb-2 text-gray-600">{c.desc}</div>
            <div className="flex gap-4 text-xs">
              <span>
                Độ khó: <b>{c.level}</b>
              </span>
              <span>
                Đơn vị giáo dục: <b>{c.org}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
