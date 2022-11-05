import { useState, useEffect } from 'react';
import { JustPushContract } from '../api/contract';
import { useTronWeb } from './useTronweb';

export function useContract(): {contract: JustPushContract | null} {
    const [contract, setContract] = useState<JustPushContract | null>(null);
    const {tronWeb, loading} = useTronWeb();
    useEffect(() => {
       if(!tronWeb) return;
       setContract(new JustPushContract(tronWeb));
    },[tronWeb])
    return {contract};
}