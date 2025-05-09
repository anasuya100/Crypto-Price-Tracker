import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState } from '../types/crypto';
import { initialCryptoData } from '../data/mockData';

const initialState: CryptoState = {
  assets: initialCryptoData,
  status: 'idle',
  error: null,
  lastUpdated: Date.now(),
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
      state.lastUpdated = Date.now();
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { updateCryptoData, setLoading, setError } = cryptoSlice.actions;

export default cryptoSlice.reducer;