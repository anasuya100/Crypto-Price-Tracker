import React, { memo } from 'react';
import { CryptoAsset } from '../types/crypto';
import PercentageChange from './PercentageChange';
import SparklineChart from './SparklineChart';

interface CryptoTableRowProps {
  asset: CryptoAsset;
}

const formatNumber = (num: number, maximumFractionDigits = 2): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toLocaleString(undefined, { maximumFractionDigits });
};

const formatCurrency = (num: number): string => {
  // Special case for stablecoins
  if (num >= 0.99 && num <= 1.01) {
    return '$' + num.toFixed(4);
  }
  
  // Regular case
  if (num >= 1) {
    return '$' + num.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else {
    // For very small numbers, show more decimal places
    return '$' + num.toLocaleString(undefined, { 
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    });
  }
};

const CryptoTableRow: React.FC<CryptoTableRowProps> = memo(({ asset }) => {
  return (
    <tr className="hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-400">{asset.rank}</td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <img 
            src={asset.logoUrl} 
            alt={`${asset.name} logo`} 
            className="w-6 h-6 mr-2"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <div className="text-sm font-medium text-white">{asset.name}</div>
            <div className="text-xs text-gray-400">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-white">
        {formatCurrency(asset.currentPrice)}
      </td>
      <td className="px-4 py-3">
        <PercentageChange value={asset.priceChangePercentage1h} />
      </td>
      <td className="px-4 py-3">
        <PercentageChange value={asset.priceChangePercentage24h} />
      </td>
      <td className="px-4 py-3">
        <PercentageChange value={asset.priceChangePercentage7d} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        ${formatNumber(asset.marketCap)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        ${formatNumber(asset.volume24h)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {formatNumber(asset.circulatingSupply)} {asset.symbol}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {asset.maxSupply ? formatNumber(asset.maxSupply) + ' ' + asset.symbol : '∞'}
      </td>
      <td className="px-4 py-3">
        <SparklineChart data={asset.sparklineData} width={100} height={30} />
      </td>
    </tr>
  );
});

export default CryptoTableRow;