import { AddNotificationRequest } from "@justpush/api-types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNotificationMutation } from "../api";
import { useTronWeb } from "../hooks/useTronweb";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import signMessage from "../lib/sign";

interface IProps {
  groupId: string;
}

type Inputs = {
  title: string;
  url: string;
  to: string;
  content: string;
  broadcast: boolean;
};

const SendNotificationForm = ({ groupId }: IProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      broadcast: true,
    },
  });
  const broadcast = watch("broadcast");

  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );

  const [addNotification, { isLoading, isError }] =
    useAddNotificationMutation();

  const { tronWeb } = useTronWeb();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!tronWeb || !publicKey) {
      toast.error("Please connect to TronLink");
      return;
    }
    setLoading(true);
    const id = uuidv4();
    const timestamp = Math.floor(Date.now() / 1000);
    const request: AddNotificationRequest = {
      id,
      groupId,
      broadcast: data.broadcast,
      self: false,
      to: data.to || "",
      notification: {
        title: data.title,
        content: data.content,
        link: data.url,
      },
      timestamp,
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
      const res = await addNotification({
        request,
        signature,
        publicKey,
      });

      if (!isError) {
        toast.success("Notification sent");
        reset();
      } else {
        toast.error("Error occured while sending notification");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error occured while sending notification");
      setLoading(false);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-slate-200 dark:divide-slate-900 my-2"
    >
      <div className="rounded-md p-3 bg-slate-100 dark:bg-slate-700 space-y-4 divide-y divide-slate-300 dark:divide-slate-800">
        <div className="font-medium">Send a notification to the group</div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6 mt-6">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="broadcast"
                  aria-describedby="broadcast-description"
                  type="checkbox"
                  {...register("broadcast", {})}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="broadcast"
                  className="font-medium text-slate-700 dark:text-slate-300"
                >
                  Broadcast
                </label>
                <p
                  id="broadcast-description"
                  className="text-slate-500 dark:text-slate-300"
                >
                  Broadcast notification to all subscribers
                </p>
              </div>
            </div>
          </div>
          {!broadcast && (
            <div className="sm:col-span-6">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                To
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="to"
                  {...register("to", {
                    required: true,
                    minLength: 34,
                  })}
                  placeholder="TBEcwDVNdRe8f5mYSwtbPk7AnhVnaiBKgw"
                  disabled={loading}
                  className={
                    loading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                      : errors.to
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border dark:border-slate-900 rounded-r-md dark:bg-slate-800 border-red-300 focus:outline-none"
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-800 focus:outline-none"
                  }
                />
              </div>
              {errors.to && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  A valid subscriber address is required.
                </p>
              )}
            </div>
          )}
          <div className="sm:col-span-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700  dark:text-slate-300"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: true,
                  minLength: 4,
                })}
                disabled={loading}
                className={
                  loading
                    ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                    : errors.title
                    ? "px-2 py-1 shadow-sm block w-full sm:text-sm border dark:border-slate-900 rounded-r-md dark:bg-slate-800 border-red-300 focus:outline-none"
                    : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-800 focus:outline-none"
                }
              />
            </div>
            {errors.title && (
              <p className="mt-2 text-sm text-red-600" id="name-error">
                Title must be at least 4 characters in length.
              </p>
            )}
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700  dark:text-slate-300"
            >
              Content
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                {...register("content", {
                  required: true,
                  minLength: 10,
                })}
                disabled={loading}
                rows={3}
                className={
                  loading
                    ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                    : errors.content
                    ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border dark:border-slate-900 rounded-md dark:bg-slate-800 border-red-300 focus:outline-none"
                    : "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-800 focus:outline-none"
                }
                defaultValue={""}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500  dark:text-slate-400">
              Write notification content.
            </p>
            {errors.content && (
              <p className="mt-2 text-sm text-red-600" id="name-error">
                Notification content must be at least 10 characters in length.
              </p>
            )}
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-slate-700  dark:text-slate-300"
            >
              Targe URL
            </label>
            <div className="mt-1 flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-900 bg-slate-50 dark:bg-slate-800 text-slate-500  dark:text-slate-200 sm:text-sm">
                https://
              </span>
              <input
                type="text"
                disabled={loading}
                placeholder={"website.io/app/dashboard"}
                id="url"
                {...register("url", {
                  required: true,
                })}
                autoComplete="logo"
                className={
                  loading
                    ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                    : errors.url
                    ? "px-2 py-1 shadow-sm block w-full sm:text-sm border dark:border-slate-900 rounded-r-md dark:bg-slate-800 border-red-300 focus:outline-none"
                    : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-800 focus:outline-none"
                }
              />
            </div>
            {errors.url && (
              <p className="mt-2 text-sm text-red-600" id="name-error">
                A target url is required.
              </p>
            )}
          </div>
        </div>

        <div className="pt-5">
          <div className="flex">
            <input
              disabled={
                errors.title !== undefined ||
                errors.content !== undefined ||
                errors.url !== undefined ||
                (!broadcast && errors.to !== undefined) ||
                loading
              }
              value={loading ? "Loading..." : "Send Notification"}
              type="submit"
              className={
                loading
                  ? "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 "
                  : "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SendNotificationForm;
