import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useAddGroupMutation } from "../api";
import { AddGroupRequest } from "@justpush/api-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContract } from "../hooks/useContract";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  description: string;
  logo: string;
  website: string;
};

const CreateGroup = () => {
  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );
  const [createGroupActionLoading, setCreateGroupActionLoading] =
    useState(false);
  const { contract } = useContract();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [addGroup, { isError, isLoading: isApiLoading, isSuccess, data }] =
    useAddGroupMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setCreateGroupActionLoading(true);
    if (!contract) {
      console.error("Contract not found");
      return;
    }

    if (!publicKey) {
      console.error("Public address not found");
      return;
    }

    const id = uuidv4();
    contract
      .createGroup(id, publicKey, {
        name: data.name,
        description: data.description,
        image: data.logo,
        website: data.website,
      })
      .then((res) => {
        const request: AddGroupRequest = {
          id,
          owner: publicKey,
          name: data.name,
          description: data.description,
          image: data.logo,
          website: data.website,
        };
        return addGroup({ request, publicKey });
      })
      .then((apiRespons) => {
        console.log(apiRespons);
        toast.success("Group created", {});
        navigate("/manage-groups");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error creating group");
      })
      .finally(() => {
        setCreateGroupActionLoading(false);
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
                  disabled={createGroupActionLoading}
                  className={
                    createGroupActionLoading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                      : errors.name
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border dark:border-slate-900 rounded-md dark:bg-slate-900 border-red-300 focus:outline-none"
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-900 focus:outline-none"
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
                  disabled={createGroupActionLoading}
                  rows={3}
                  className={
                    createGroupActionLoading
                      ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                      : errors.description
                      ? "px-2 py-1 shadow-sm  block w-full sm:text-sm border dark:border-slate-900 rounded-md dark:bg-slate-900 border-red-300 focus:outline-none"
                      : "px-2 py-1 shadow-sm  block w-full sm:text-sm border border-zinc-300 dark:border-slate-900 rounded-md dark:bg-slate-900 focus:outline-none"
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
                  disabled={createGroupActionLoading}
                  placeholder={"website.io"}
                  id="website"
                  {...register("website", {
                    required: true,
                  })}
                  autoComplete="website"
                  className={
                    createGroupActionLoading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100 focus:outline-none"
                      : errors.website
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 dark:border-slate-900 rounded-r-md dark:bg-slate-900 border-red-300 focus:outline-none"
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-900 focus:outline-none"
                  }
                />
              </div>
              {errors.website && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  A valid website is required.
                </p>
              )}
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-slate-700  dark:text-slate-300"
              >
                Logo URL
              </label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-900 bg-slate-50 dark:bg-slate-800 text-slate-500  dark:text-slate-200 sm:text-sm">
                  https://
                </span>
                <input
                  type="text"
                  disabled={createGroupActionLoading}
                  placeholder={"website.io/logo-64x64.png"}
                  id="logo"
                  {...register("logo", {
                    required: true,
                  })}
                  autoComplete="logo"
                  className={
                    createGroupActionLoading
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-700 bg-slate-100"
                      : errors.logo
                      ? "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 dark:border-slate-900 rounded-r-md dark:bg-slate-900 border-red-300"
                      : "px-2 py-1 shadow-sm block w-full sm:text-sm border border-l-0 border-zinc-300 dark:border-slate-900 rounded-r-md dark:bg-slate-900"
                  }
                />
              </div>
              {errors.logo && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  A logo url is required.
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
              createGroupActionLoading
            }
            value={createGroupActionLoading ? "Loading..." : "Create"}
            type="submit"
            className={
              createGroupActionLoading
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
