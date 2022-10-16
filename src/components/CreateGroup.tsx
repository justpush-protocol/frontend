import { useForm, SubmitHandler } from "react-hook-form";
import { useTronWeb } from "../hooks/useTronweb";
import { useAddGroupMutation } from "../api";
import {
  AddGroupRequest,
  AddGroupResponse,
} from "@justlabs-platform/just-push-api-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  description: string;
  logo: File;
  website: string;
};

async function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });
}

const CreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { tronWeb } = useTronWeb();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = useForm<Inputs>();
  const [addGroup, { isError, isLoading: isApiLoading, isSuccess, data }] =
    useAddGroupMutation();
  const watchFields = watch("logo");

  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if(!watchFields) return;
    if ((watchFields as any)[0]) {
      setLogo(URL.createObjectURL((watchFields as any)[0]));
    }
  }, [dirtyFields.logo]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);

    let logoBase64: string;

    try {
      logoBase64 = await readAsDataURL((data.logo as any)[0]);
    } catch(e) {
      toast.error("Error reading logo file");
      setLoading(false);
      return;
    }
    console.log(logoBase64);

    const request: AddGroupRequest = {
      id: Math.floor(Math.random() * 100000), // todo
      name: data.name,
      description: data.description,
      image: logoBase64,
      website: data.website,
    };

    const publicKey = tronWeb.defaultAddress.base58; // todo check if this is correct
    let signature = "";
    try {
      // sign the message
      // const signature = await tronWeb.trx.sign(JSON.stringify(request));
      signature = "TODO";
    } catch {
      toast.error("Error signing message");
      setLoading(false);
      return;
    }

    // call the api
    toast.promise(addGroup({ request, signature, publicKey }), {
      pending: "Creating group...",
      success: "Group created",
      error: "Error creating group.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-slate-200 dark:divide-slate-900"
    >
      <div className="space-y-8 divide-y divide-slate-200 dark:divide-slate-800">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-slate-900  dark:text-slate-200">
              Group Information
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Quickly make a channel of communication with your users.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: true,
                    minLength: 4,
                  })}
                  disabled={loading}
                  className={
                    loading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-700 bg-slate-100"
                      : errors.name
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border dark:border-slate-900 rounded-md dark:bg-slate-900 border-red-300 "
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-900"
                  }
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  Group name must be at least 4 characters in length.
                </p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  {...register("description", {
                    required: true,
                    minLength: 20,
                  })}
                  disabled={loading}
                  rows={3}
                  className={
                    loading
                      ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-700 bg-slate-100"
                      : errors.description
                      ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border dark:border-slate-900 rounded-md dark:bg-slate-900 border-red-300"
                      : "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-900"
                  }
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-slate-500  dark:text-slate-400">
                Write a few sentences about the notification group.
              </p>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  Group description must be at least 20 characters in length.
                </p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                Logo
              </label>
              {logo && (
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 py-2 px-1">
                  <img
                    className="inline-block h-14 w-14 rounded-full border border-slate-300 dark:border-slate-900 p-1"
                    src={
                      logo || ''
                    }
                  />
                </div>
              )}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-300 dark:border-slate-900 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400  dark:text-slate-800"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-slate-600  dark:text-slate-400">
                    <label
                      htmlFor="logo"
                      className="relative cursor-pointer rounded-md font-medium text-slate-200 px-2 py-1  bg-slate-600 dark:bg-slate-900"
                    >
                      <span>Upload logo</span>
                      <input
                        id="logo"
                        disabled={loading}
                        {...register("logo", {
                          required: true,
                        })}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="sr-only dark:bg-slate-900"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG (64x64px)</p>
                </div>
              </div>
              {errors.logo && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  A logo of PNG/JPG type with max size of 10MB is required.
                </p>
              )}
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                Website
              </label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-900 bg-slate-50 dark:bg-slate-800 text-slate-500  dark:text-slate-200 sm:text-sm">
                  https://
                </span>
                <input
                  type="text"
                  disabled={loading}
                  id="website"
                  {...register("website", {
                    required: true,
                  })}
                  autoComplete="website"
                  className={
                    loading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100"
                      : errors.website
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 dark:border-slate-900 rounded-r-md dark:bg-slate-900 border-red-300"
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-900"
                  }
                />
              </div>
              {errors.website && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  A valid website is required.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <input
            disabled={
              errors.name !== undefined ||
              errors.description !== undefined ||
              errors.website !== undefined ||
              errors.logo !== undefined ||
              loading
            }
            value={loading ? "Loading..." : "Create"}
            type="submit"
            className={
              loading
                ? "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 "
                : "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
            }
          />
        </div>
      </div>
    </form>
  );
};

export default CreateGroup;
