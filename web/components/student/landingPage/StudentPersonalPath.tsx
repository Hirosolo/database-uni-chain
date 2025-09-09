import React from "react";

export default function StudentPersonalPath() {
  return (
    <section className="bg-blue-800 rounded-xl p-8 text-white max-w-5xl mx-auto mt-8 flex gap-8 items-center">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">LỘ TRÌNH HỌC CÁ NHÂN HÓA</h2>
        <div className="mb-4">Hãy bắt đầu nào!</div>
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`h-2 w-12 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-gray-200'}`}></span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-400 text-white rounded px-4 py-3 text-left">Chuẩn bị cho cơ hội việc làm mới</button>
          <button className="bg-blue-400 text-white rounded px-4 py-3 text-left">Nâng cao kiến thức chuyên môn</button>
          <button className="bg-blue-400 text-white rounded px-4 py-3 text-left">Tích lũy chứng chỉ để bổ sung CV</button>
          <button className="bg-blue-400 text-white rounded px-4 py-3 text-left">Học vì đam mê, mở rộng hiểu biết</button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img src="/image-Path1.svg" alt="Lộ trình học" className="h-80" />
      </div>
    </section>
  );
}
