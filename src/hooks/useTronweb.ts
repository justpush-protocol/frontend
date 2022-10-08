import { useState, useEffect } from 'react';

export function useTronWeb(): {tronWeb: any}  {  
  const [tronWeb, setTronWeb] = useState(null);
  useEffect(() => {
    if ((window as any).tronWeb) {
        setTronWeb((window as any).tronWeb);
    }
  }, [(window as any).tronWeb]);

  return {tronWeb};
}