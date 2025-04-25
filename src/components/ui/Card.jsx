// src/components/ui/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between hover:scale-105 transition-transform">
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
    </div>
  );
};

export default StatCard;