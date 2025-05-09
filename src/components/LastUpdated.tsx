import React from 'react';
import { RefreshCw as Refresh } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';

const LastUpdated: React.FC = () => {
  const { lastUpdated } = useAppSelector(state => state.crypto);
  
  // Time since last update in seconds
  const getTimeSinceUpdate = (): number => {
    return Math.floor((Date.now() - lastUpdated) / 1000);
  };
  
  const [secondsAgo, setSecondsAgo] = React.useState(getTimeSinceUpdate());
  
  // Update the "seconds ago" counter every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(getTimeSinceUpdate());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastUpdated]);
  
  const refreshText = secondsAgo < 1 
    ? 'Just updated' 
    : `Updated ${secondsAgo}s ago`;
  
  return (
    <div className="bg-gray-800/50 rounded-md py-1 px-3 flex items-center text-xs text-gray-300">
      <Refresh className={`h-3 w-3 mr-1.5 ${secondsAgo < 1 ? 'text-green-400 animate-spin' : 'text-gray-400'}`} />
      {refreshText}
    </div>
  );
};

export default LastUpdated;