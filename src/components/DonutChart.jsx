import React from "react";

export default function DonutChart({ data }) {
  const total = Object.values(data).reduce((acc, val) => acc + val, 0);

  const colors = {
    Valid: "#22c55e", // green
    Invalid: "#ef4444", // red
    Unknown: "#facc15", // yellow
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Percentages (for display only)
  const percentages = {
    Valid: ((data.Valid / total) * 100).toFixed(1),
    Invalid: ((data.Invalid / total) * 100).toFixed(1),
    Unknown: ((data.Unknown / total) * 100).toFixed(1),
  };

  // Angles to rotate each segment
  const angles = {
    Valid: 0,
    Invalid: (data.Valid / total) * 360,
    Unknown: ((data.Valid + data.Invalid) / total) * 360,
  };

  // Stroke length (portion of the circle)
  const strokeLengths = {
    Valid: (data.Valid / total) * circumference,
    Invalid: (data.Invalid / total) * circumference,
    Unknown: (data.Unknown / total) * circumference,
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        className="transform -rotate-90"
      >
        {/* Base circle (light gray) */}
        <circle
          r={radius}
          cx={60}
          cy={60}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={20}
        />

        {/* Valid Segment */}
        <circle
          r={radius}
          cx={60}
          cy={60}
          fill="transparent"
          stroke={colors.Valid}
          strokeWidth={20}
          strokeDasharray={`${strokeLengths.Valid} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(0 60 60)"
        />

        {/* Invalid Segment */}
        <circle
          r={radius}
          cx={60}
          cy={60}
          fill="transparent"
          stroke={colors.Invalid}
          strokeWidth={20}
          strokeDasharray={`${strokeLengths.Invalid} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(${angles.Invalid} 60 60)`}
        />

        {/* Unknown Segment */}
        <circle
          r={radius}
          cx={60}
          cy={60}
          fill="transparent"
          stroke={colors.Unknown}
          strokeWidth={20}
          strokeDasharray={`${strokeLengths.Unknown} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(${angles.Unknown} 60 60)`}
        />
      </svg>

      <div className="mt-4 grid grid-cols-1 gap-1 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[key] }}
            />
            <span>{key}</span>
            <span className="font-semibold ml-1">{value}</span>
            <span className="text-gray-500 ml-1">({percentages[key]}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
