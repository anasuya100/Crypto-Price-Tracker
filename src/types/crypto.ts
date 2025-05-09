export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  currentPrice: number;
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparklineData: number[];
}

export interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  lastUpdated: number;
}