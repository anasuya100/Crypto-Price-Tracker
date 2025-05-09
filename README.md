# 💹 Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices. Inspired by platforms like CoinMarketCap, this app simulates live updates using mock WebSocket behavior and handles all state management via Redux Toolkit.


## 🎯 Objective

Track the prices and stats of top cryptocurrencies in real-time using a responsive, state-managed table layout.


## 🛠️ Tech Stack


| Frontend       | React.js                                 
| State Mgmt     | Redux Toolkit, React-Redux               
| Styling        | Tailwind CSS / CSS Modules               
| Simulation     | Binance     
| Deployment     | Vercel / Netlify                   



### ✅ UI Table

- Displays top 5 cryptocurrencies (e.g., BTC, ETH, USDT)
- Columns:
  - `#` | Logo | Name | Symbol | Price | 1h % | 24h % | 7d % | Market Cap | 24h Volume | Circulating Supply | Max Supply | 7D Chart
- Percentage changes are **color-coded**:
  - Green → Positive
  - Red → Negative
- Responsive design — mobile & desktop friendly
- Static chart displayed in the 7D Chart column

