import React from "react";

export default function StudentHeader() {
  return (
    <section className="bg-blue-800 rounded-xl p-8 text-white max-w-4xl mx-auto mt-8 pt-16">
      <h1 className="text-2xl font-bold mb-2 ">Khám phá và nhận chứng chỉ NFT cho khóa học của bạn</h1>
      <ul className="list-disc pl-6 mb-4">
        <li>Hoàn thành khóa học và nhận chứng chỉ NFT duy nhất trên blockchain</li>
        <li>Chứng chỉ minh bạch, không thể làm giả, có thể kiểm chứng toàn cầu</li>
        <li>Lưu trữ, chia sẻ dễ dàng trong hồ sơ học tập số hóa</li>
      </ul>
      <div className="flex justify-end">
        <button className="text-white bg-blue-500 font-semibold px-6 rounded rounded-xl py-3 ">Khám phá khóa học ngay</button>
      </div>
    </section>
  );
}
