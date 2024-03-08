"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreateBatch() {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const createBatch = api.batch.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBatch.mutate({});
      }}
      onError={(e) => {
        e.preventDefault();
        console.error(e);
      }}
      className="flex flex-col gap-2"
    >
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Start new count?
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>Click the button on the right to start a new count!</p>
            </div>
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
              <button
                type="submit"
                disabled={createBatch.isLoading}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {createBatch.isLoading ? "Starting..." : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
