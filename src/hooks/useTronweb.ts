import { useState, useEffect } from 'react';

export function useTronWeb(): {tronLink: any, tronWeb: any, loading: boolean, currentAddress: string | null}{ 
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [tronWeb, setTronWeb] = useState(null);
  const [tronLink, setTronLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const delay = 1000;
  let check = 0;

  useEffect(() => {
      let id = setInterval(() => {
        if ((window as any).tronLink && (window as any).tronWeb) {
          (window as any).tronWeb.feeLimit = 1000 * 1e6;
          setTronWeb((window as any).tronWeb);
          setTronLink((window as any).tronLink);
          setCurrentAddress((window as any).tronWeb.defaultAddress.base58);
          setLoading(false);
          clearInterval(id)
        } else {
          if(check > 4) {
            setLoading(false);
            clearInterval(id)
          }
          check++;
          console.log("TronWeb is not installed");
        }
      }, delay);
    }, []);

  return {tronLink, tronWeb, loading, currentAddress};
}