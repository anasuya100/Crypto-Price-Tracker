import { AppDispatch } from '../store';
import { updateCryptoData } from '../store/cryptoSlice';
import { CryptoAsset } from '../types/crypto';
import { initialCryptoData } from '../data/mockData';

class BinanceWebSocketService {
  private ws: WebSocket | null = null;
  private dispatch: AppDispatch | null = null;
  private assets: Map<string, CryptoAsset> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  constructor() {
    // Initialize assets map with initial data
    initialCryptoData.forEach(asset => {
      this.assets.set(asset.symbol.toLowerCase(), asset);
    });
  }

  connect(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.establishConnection();
  }

  private establishConnection() {
    if (this.isConnecting) return;
    
    try {
      this.isConnecting = true;
      
      // Format symbols according to Binance WebSocket API requirements
      const symbols = Array.from(this.assets.keys())
        .filter(symbol => symbol && symbol.length > 0)
        .map(symbol => `${symbol.toLowerCase()}usdt@ticker`);

      if (symbols.length === 0) {
        throw new Error('No valid symbols to subscribe to');
      }

      // Use single stream endpoint for multiple symbols
      const wsUrl = `wss://stream.binance.com:9443/stream?streams=${symbols.join('/')}`;
      
      if (this.ws) {
        this.ws.close();
      }

      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      
      console.log('Connecting to Binance WebSocket...', wsUrl);
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private handleOpen() {
    console.log('Connected to Binance WebSocket');
    this.reconnectAttempts = 0;
    this.isConnecting = false;
  }

  private handleMessage(event: MessageEvent) {
    try {
      const response = JSON.parse(event.data);
      const data = response.data; // Extract data from stream response
      
      if (!data || !data.s) {
        console.warn('Received invalid message format:', response);
        return;
      }

      const symbol = data.s.replace('USDT', '');
      const asset = this.assets.get(symbol.toLowerCase());
      
      if (asset) {
        const priceChange1h = parseFloat(data.P) || 0; // 1h price change percent
        const priceChange24h = parseFloat(data.p) || 0; // 24h price change percent
        const volume24h = (parseFloat(data.v) || 0) * (parseFloat(data.c) || 0); // 24h volume in quote asset
        const currentPrice = parseFloat(data.c) || 0;
        
        const updatedAsset: CryptoAsset = {
          ...asset,
          currentPrice,
          priceChangePercentage1h: priceChange1h,
          priceChangePercentage24h: priceChange24h,
          volume24h,
          sparklineData: [...asset.sparklineData.slice(1), currentPrice],
        };
        
        this.assets.set(symbol.toLowerCase(), updatedAsset);
        
        if (this.dispatch) {
          this.dispatch(updateCryptoData(Array.from(this.assets.values())));
        }
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  }

  private handleClose(event: CloseEvent) {
    console.log(`WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`);
    this.isConnecting = false;
    this.handleReconnect();
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error);
    this.isConnecting = false;
    
    // If we have a WebSocket instance, check its state
    if (this.ws) {
      console.log('WebSocket state:', {
        readyState: this.ws.readyState,
        bufferedAmount: this.ws.bufferedAmount,
        protocol: this.ws.protocol
      });
    }

    this.handleReconnect();
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
      
      setTimeout(() => {
        if (!this.isConnecting) {
          this.establishConnection();
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached. Using initial data as fallback.');
      // Dispatch initial data as fallback
      if (this.dispatch) {
        this.dispatch(updateCryptoData(initialCryptoData));
      }
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnecting = false;
      console.log('Disconnected from Binance WebSocket');
    }
  }
}

export const binanceWebSocketService = new BinanceWebSocketService();