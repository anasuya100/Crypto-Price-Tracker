import { CryptoAsset } from '../types/crypto';

// Generate random price chart data for the sparkline
const generateSparklineData = (): number[] => {
  const data: number[] = [];
  let base = Math.random() * 100 + 50;
  
  for (let i = 0; i < 7; i++) {
    // Add some volatility but keep a general trend
    const change = (Math.random() - 0.5) * 10;
    base += change;
    data.push(Math.max(base, 1)); // Ensure price is always positive
  }
  
  return data;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    currentPrice: 68423.12,
    priceChangePercentage1h: 0.54,
    priceChangePercentage24h: 2.31,
    priceChangePercentage7d: -1.22,
    marketCap: 1337458592340,
    volume24h: 42516792340,
    circulatingSupply: 19543000,
    maxSupply: 21000000,
    sparklineData: generateSparklineData(),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    currentPrice: 3521.47,
    priceChangePercentage1h: -0.23,
    priceChangePercentage24h: 1.56,
    priceChangePercentage7d: 3.78,
    marketCap: 422982345670,
    volume24h: 18943256780,
    circulatingSupply: 120250000,
    maxSupply: null,
    sparklineData: generateSparklineData(),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    currentPrice: 1.00,
    priceChangePercentage1h: 0.01,
    priceChangePercentage24h: -0.02,
    priceChangePercentage7d: 0.01,
    marketCap: 102834567890,
    volume24h: 67854321098,
    circulatingSupply: 102834567890,
    maxSupply: null,
    sparklineData: generateSparklineData().map(() => 1 + (Math.random() - 0.5) * 0.01),
  },
  {
    id: 'binancecoin',
    rank: 4,
    name: 'Binance Coin',
    symbol: 'BNB',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    currentPrice: 589.32,
    priceChangePercentage1h: 0.87,
    priceChangePercentage24h: -0.54,
    priceChangePercentage7d: -2.12,
    marketCap: 89721345678,
    volume24h: 2134567890,
    circulatingSupply: 152134567,
    maxSupply: 200000000,
    sparklineData: generateSparklineData(),
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    currentPrice: 148.76,
    priceChangePercentage1h: 1.12,
    priceChangePercentage24h: 4.32,
    priceChangePercentage7d: 9.87,
    marketCap: 64538219870,
    volume24h: 3789456123,
    circulatingSupply: 434543219,
    maxSupply: null,
    sparklineData: generateSparklineData(),
  },
];