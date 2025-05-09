import React from 'react';

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  lineColor?: string;
  className?: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  width = 100,
  height = 30,
  lineColor,
  className = '',
}) => {
  // Calculate dynamic line color based on trend
  const determineColor = () => {
    if (lineColor) return lineColor;
    
    // Determine if trend is up or down
    const firstPoint = data[0];
    const lastPoint = data[data.length - 1];
    
    return lastPoint >= firstPoint 
      ? 'rgba(16, 185, 129, 0.8)' // Green for upward trend
      : 'rgba(239, 68, 68, 0.8)'; // Red for downward trend
  };

  // If no data or only one point, return empty
  if (!data || data.length <= 1) {
    return <div className={`w-[${width}px] h-[${height}px] ${className}`} />;
  }

  // Calculate scaling factors
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero
  
  // Calculate points for the polyline
  const xStep = width / (data.length - 1);
  
  const points = data.map((value, index) => {
    const x = index * xStep;
    // Invert Y because SVG coordinates start from top
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const color = determineColor();

  return (
    <svg width={width} height={height} className={className}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default SparklineChart;