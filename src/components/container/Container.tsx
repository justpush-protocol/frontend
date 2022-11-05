import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTronWeb } from "../../hooks/useTronweb";
import Loading from "../Loading";
import MobileNavigation from "./navigation/MobileNavigation";
import StaticNavigation from "./navigation/StaticNavigation";
import Header from "./Header";
import { setConnected, setCurrentAddress } from "../../redux/accountSlice";
import WalletNotFound from "../WalletNotFound";

export type OutLetContextType = {
  setContentLoading: (loading: boolean) => void;
  setError: (error: string | number | null) => void;
};

const Container = () => {
  const { pathname } = useLocation();
  const [contentLoading, setContentLoading] = useState(true);
  const [error, setError] = useState<string | number | null>(null);
  const dark = useSelector((state: RootState) => state.app.dark);
  const connected = useSelector((state: RootState) => state.account.connected);
  const dispatch = useDispatch();
  const {
    tronLink,
    tronWeb,
    loading: tronWebLoading,
    currentAddress,
  } = useTronWeb();

  const connectToWallet = () => {
    if (!tronWeb || !tronLink) return;
    console.log("Requesting account info...");
    tronLink
      .request({ method: "tron_requestAccounts" })
      .then((res: { code: number; message: string } | "") => {
        if (res === "") {
          dispatch(setConnected(-1));
        } else {
          dispatch(setConnected(res.code));
          if (res.code === 200 && tronWeb.defaultAddress) {
            dispatch(setCurrentAddress(tronWeb.defaultAddress.base58));
          }
        }
      });
  };

  useEffect(() => {
    setContentLoading(true);
    setError(null);
  }, [pathname]);

  useEffect(() => {
    if (!tronWeb || !tronLink) return;
    connectToWallet();
  }, [tronLink]);

  useEffect(() => {
    if (connected !== 200) return;
    if (!tronWeb || !tronLink) return;

    const onTronLinkMessage = (event: {
      data: {
        message?: {
          action?: string;
          data?: any;
        };
      };
    }) => {
      if (event.data.message) {
        switch (event.data.message.action) {
          case "tabReply":
          case "setNode":
            if (
              event.data.message.data.node &&
              event.data.message.data.node.chain !== "_"
            ) {
              return <div>Please select TRON mainnet.</div>;
            }
            break;
          case "setAccount":
          case "accountsChanged":
          case "connectWeb":
            if (event.data.message.data.address) {
              dispatch(setCurrentAddress(event.data.message.data.address));
            }
            break;
          case "connect":
            console.log("Connected to TronLink");
            break;
          case "disconnect":
          case "disconnectWeb":
          case "rejectWeb":
            return <div>Please connect wallet.</div>;
          default:
            break;
        }
      }
    };
    window.addEventListener("message", onTronLinkMessage);
  }, [connected]);

  useEffect(() => {
    dispatch(setCurrentAddress(currentAddress));
  }, [currentAddress]);

  if (!tronWeb) {
    if (tronWebLoading) {
      return <Loading />;
    }
    return <WalletNotFound />;
  }

  // navigate to groups by default
  if (pathname === "/") {
    return <Navigate to="/groups" />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-slate-900 flex flex-col h-screen overflow-auto">
        <MobileNavigation />
        <StaticNavigation />

        <div className="md:pl-64 flex flex-col flex-1">
          <Header connectToWallet={connectToWallet} />
          <main className="rounded-lg md:rounded-[16px] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 flex-1 mb-3 mx-3 md:mt-5 my-5 md:my-10 md:mx-10">
            {contentLoading && (
              <div className="flex h-full">
                <div role="status" className="text-center m-auto">
                  <svg
                    className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex h-full">
                <div role="status" className="text-center m-auto space-y-2">
                  <p>Something went wrong. Please refresh this page.</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <Outlet context={{ setContentLoading, setError }} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Container;
