import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const EmptyGroupList = () => {
    const navigate = useNavigate();
    return (
        <div className="text-center my-10">
      <svg
        className="mx-auto h-12 w-12 text-slate-500 dark:text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-300">You do not own or manage any notification groups.</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by creating a new group to communicate with your audience.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => navigate("/create-group")}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Group
        </button>
      </div>
    </div>
    )
};

export default EmptyGroupList;