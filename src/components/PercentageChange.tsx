import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PercentageChangeProps {
  value: number;
  className?: string;
}

const PercentageChange: React.FC<PercentageChangeProps> = ({ value, className = '' }) => {
  const isPositive = value >= 0;
  
  const baseClasses = 'flex items-center font-medium text-sm';
  const colorClasses = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`}>
      {isPositive ? (
        <TrendingUp className="mr-1 h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="mr-1 h-3.5 w-3.5" />
      )}
      <span>{isPositive ? '+' : ''}{value.toFixed(2)}%</span>
    </div>
  );
};

export default PercentageChange;