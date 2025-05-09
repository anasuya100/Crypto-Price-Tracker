import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { RefreshCw as Refresh } from 'lucide-react';

const CryptoHeader: React.FC = () => {
  const { lastUpdated } = useAppSelector(state => state.crypto);
  
  // Format the last updated time
  const formatLastUpdated = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Cryptocurrency Prices</h1>
        <p className="text-gray-400 text-sm">
          Real-time data for top cryptocurrencies by market capitalization
        </p>
      </div>
      
      <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
        <Refresh className="h-4 w-4 mr-2 animate-spin" />
        <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
      </div>
    </div>
  );
};

export default CryptoHeader;