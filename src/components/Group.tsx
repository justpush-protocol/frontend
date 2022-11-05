import { SubscribeRequest, UnsubscribeRequest } from "@justpush/api-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSubscribeMutation, useUnSubscribeMutation } from "../api";
import { useTronWeb } from "../hooks/useTronweb";
import signMessage from "../lib/sign";
import { RootState } from "../redux/store";

export interface IGroupData {
  groupId: string;
  name: string;
  description: string | null;
  image: string | null;
  isOwner: boolean;
  isSubscriber: boolean;
  owner: string;
}
const Group = ({
  groupId,
  name,
  description,
  image,
  isOwner,
  isSubscriber,
  owner,
}: IGroupData) => {
  //use subscribe mutation
  const { tronWeb } = useTronWeb();

  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );
  const [
    subscribe,
    { isError: isSubscribeError, isLoading: isSubscribeLoading },
  ] = useSubscribeMutation();

  const [
    unsubscribe,
    { isError: isUnSubscribeError, isLoading: isUnSubscribeLoading },
  ] = useUnSubscribeMutation();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(isSubscriber);

  const handleSubscribe = async () => {
    setLoading(true);
    if (!tronWeb || !publicKey) {
      toast.error("Please connect to TronLink");
      return;
    }

    const request: SubscribeRequest = {
      groupId,
    };

    let signature = "";
    try {
      signature = await signMessage(JSON.stringify(request), tronWeb);
    } catch (error) {
      toast.error("Error occured while signing message");
      setLoading(false);
      return;
    }

    try {
      await subscribe({
        request,
        signature,
        publicKey,
      });
      toast.success("Subscribed");
      setIsSubscribed(true);
      setLoading(false);
    } catch (error) {
      toast.error("Error occured while subscribing. Please try again");
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    if (!tronWeb || !publicKey) {
      toast.error("Please connect to TronLink");
      return;
    }

    const request: UnsubscribeRequest = {
      groupId,
    };

    let signature = "";
    try {
      signature = await signMessage(JSON.stringify(request), tronWeb);
    } catch (error) {
      toast.error("Error occured while signing message");
      setLoading(false);
      return;
    }

    try {
      await unsubscribe({
        request,
        signature,
        publicKey,
      });
      toast.success("Unsubscribed");
      setIsSubscribed(false);
      setLoading(false);
    } catch (error) {
      toast.error("Error occured while unsubscribing. Please try again");
      setLoading(false);
    }
  };

  return (
    <div className="sm:flex py-2">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
        <img
          className="inline-block h-14 w-14 rounded-full border border-slate-300 dark:border-slate-900 p-1"
          src={
            image
              ? "http://" + image
              : "https://via.placeholder.com/100x100.png"
          }
          alt={name}
        />
      </div>
      <div className="flex md:space-x-5 space-x-3 w-full">
        <div className="w-4/6 xl:w-11/12 lg:w-10/12">
          <h4 className="tracking-wide text-lg text-blue-500 dark:text-zinc-200">
            {name}
          </h4>
          <p className="mt-1">{description || ""}</p>
        </div>
        <div className="w-2/6 xl:w-1/12 lg:w-2/12 text-sm">
          {isOwner && (
            <button
              disabled
              className="bg-gray-600 dark:bg-zinc-900 py-2 px-2 rounded-md text-zinc-200 dark:text-zinc-300"
            >
              Owner
            </button>
          )}

          {!isOwner && !isSubscribed && (
            <button
              disabled={loading}
              onClick={handleSubscribe}
              className="bg-blue-500 dark:bg-zinc-900 py-2 px-2 rounded-md text-zinc-200 dark:text-zinc-300"
            >
              {loading ? "Loading..." : "Subscribe"}
            </button>
          )}

          {!isOwner && isSubscribed && (
            <button
              disabled={loading}
              onClick={handleUnsubscribe}
              className="bg-red-400 dark:bg-zinc-900 py-2 px-2 rounded-md text-zinc-200 dark:text-zinc-300"
            >
              Unsubscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Group;
