import React from "react";
import { NFTFilters } from "./ProjectInterface";

const defaultFilters: NFTFilters = {
  type: ["Degree", "Certificate", "Award", "Credit"],
  education: ["University", "Training Center", "Company"],
  level: ["Easy", "Intermediate", "Hard"],
};

export interface NFTFilterSidebarProps {
  filters?: NFTFilters;
  onFilterChange?: (filterType: keyof NFTFilters, value: string, checked: boolean) => void;
  onClearAll?: () => void;
}

export default function NFTFilterSidebar({ 
  filters = defaultFilters,
  onFilterChange,
  onClearAll
}: NFTFilterSidebarProps) {
  return (
    <aside className="bg-white rounded shadow p-4 w-64 h-full" style={{color: 'black'}}>
      <h3 className="font-bold mb-2">Lọc</h3>
      <div className="mb-4">
        <div className="font-semibold mb-1">Loại</div>
        {filters.type.map((t) => (
          <div key={t} className="flex items-center mb-1">
            <input
              type="radio"
              name="filterType"
              value={t}
              defaultChecked={t === "Bằng cấp"}
              className="mr-2"
              onChange={(e) => onFilterChange?.('type', t, e.target.checked)}
            />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Đơn vị giáo dục</div>
        {filters.education.map((e) => (
          <div key={e} className="flex items-center mb-1">
            <input 
              type="checkbox" 
              className="mr-2"
              onChange={(evt) => onFilterChange?.('education', e, evt.target.checked)} 
            />
            <span>{e}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Độ khó</div>
        {filters.level.map((l) => (
          <div key={l} className="flex items-center mb-1">
            <input 
              type="checkbox" 
              className="mr-2"
              onChange={(evt) => onFilterChange?.('level', l, evt.target.checked)}  
            />
            <span>{l}</span>
          </div>
        ))}
      </div>
      <button 
        className="text-xs text-gray-500 underline"
        onClick={onClearAll}
      >
        Clear All
      </button>
    </aside>
  );
}
