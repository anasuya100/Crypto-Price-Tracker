// import { AppDispatch } from '../store';
// import { updateCryptoData } from '../store/cryptoSlice';
// import { CryptoAsset } from '../types/crypto';

// class MockWebSocketService {
//   private dispatch: AppDispatch | null = null;
//   private interval: NodeJS.Timeout | null = null;
//   private updateFrequency = 2000; // 2 seconds

//   constructor() {}

//   connect(dispatch: AppDispatch) {
//     this.dispatch = dispatch;
    
//     // Start simulation if not already running
//     if (!this.interval) {
//       this.startSimulation();
//       console.log('MockWebSocketService: Connected and simulation started');
//     }
//   }

//   disconnect() {
//     if (this.interval) {
//       clearInterval(this.interval);
//       this.interval = null;
//       console.log('MockWebSocketService: Disconnected');
//     }
//   }

//   private startSimulation() {
//     this.interval = setInterval(() => {
//       if (this.dispatch) {
//         this.simulatePriceUpdate();
//       }
//     }, this.updateFrequency);
//   }

//   private simulatePriceUpdate() {
//     if (!this.dispatch) return;
    
//     this.dispatch((dispatch, getState) => {
//       const { crypto } = getState();
//       const updatedAssets = crypto.assets.map(asset => this.updateAssetData(asset));
      
//       dispatch(updateCryptoData(updatedAssets));
//     });
//   }

//   private updateAssetData(asset: CryptoAsset): CryptoAsset {
//     const volatility = asset.symbol === 'USDT' ? 0.0001 : 0.01; // Stablecoins have lower volatility
    
//     // Generate random percentage change, weighted towards smaller changes
//     const generateChange = (max: number) => (Math.random() - 0.5) * 2 * max;
    
//     // Calculate new price with some random change
//     const priceChange = asset.currentPrice * generateChange(volatility);
//     const newPrice = asset.currentPrice + priceChange;
    
//     // Update percentage changes
//     const new1hChange = asset.priceChangePercentage1h + generateChange(0.5);
//     const new24hChange = asset.priceChangePercentage24h + generateChange(0.3);
//     const new7dChange = asset.priceChangePercentage7d + generateChange(0.2);
    
//     // Update volume with some random fluctuation
//     const volumeChange = asset.volume24h * generateChange(0.05);
//     const newVolume = asset.volume24h + volumeChange;
    
//     // Update sparkline data by shifting and adding new point
//     const newSparklineData = [...asset.sparklineData.slice(1), newPrice];
    
//     return {
//       ...asset,
//       currentPrice: Math.max(newPrice, 0.01), // Ensure price is positive
//       priceChangePercentage1h: new1hChange,
//       priceChangePercentage24h: new24hChange,
//       priceChangePercentage7d: new7dChange,
//       volume24h: Math.max(newVolume, 1000), // Ensure volume is reasonable
//       sparklineData: newSparklineData,
//     };
//   }
// }

// export const mockWebSocketService = new MockWebSocketService();