import React from 'react';
import CryptoTableRow from './CryptoTableRow';
import { useAppSelector } from '../hooks/useAppSelector';
import { CryptoAsset } from '../types/crypto';

const CryptoTable: React.FC = () => {
  const { assets } = useAppSelector(state => state.crypto);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
        <thead className="border-b border-gray-800">
          <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Asset</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">1h %</th>
            <th className="px-4 py-3">24h %</th>
            <th className="px-4 py-3">7d %</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">24h Volume</th>
            <th className="px-4 py-3">Circulating Supply</th>
            <th className="px-4 py-3">Max Supply</th>
            <th className="px-4 py-3">7d Chart</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {assets.map((asset: CryptoAsset) => (
            <CryptoTableRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;