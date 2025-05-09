import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTable from './components/CryptoTable';
import CryptoHeader from './components/CryptoHeader';
import { binanceWebSocketService } from './services/binanceWebSocket';
import LastUpdated from './components/LastUpdated';

function AppContent() {
  useEffect(() => {
    binanceWebSocketService.connect(store.dispatch);
    
    return () => {
      binanceWebSocketService.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <CryptoHeader />
        <div className="mb-6 flex justify-end">
          <LastUpdated />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-2 md:p-4 overflow-hidden">
          <CryptoTable />
        </div>
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Live data from Binance WebSocket API</p>
          <p className="mt-2">© 2025 Crypto Tracker - Redux Toolkit Demo</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;