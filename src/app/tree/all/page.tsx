"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

const formatter = new Intl.DateTimeFormat("en-GB");

export default function External() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const from = page * itemsPerPage + 1;
  const to = (page + 1) * itemsPerPage;

  const TreeData = api.tree.getTrees.useQuery({
    skip: from - 1,
    take: to - from,
  });
  const TreeCount = api.tree.getTreeCount.useQuery();

  if (TreeData.isError)
    return (
      <div> Oh No! There was an error! {JSON.stringify(TreeData.error)}</div>
    );

  if (TreeData.isSuccess)
    return (
      <div className="rounded-md bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Trees
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the trees recorded by Navya{" "}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Export as CSV
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 rounded-md">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Illegally Felled?
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {TreeData.data?.map((tree) => {
                    const treeCreationDate = new Date(tree.createdAt);
                    const treeDate = formatter.format(treeCreationDate);
                    return (
                      <tr key={tree.age}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {tree.age}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {tree.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {tree.age}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {treeDate}
                        </td>
                        <td className="flex items-center justify-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <input
                            type="checkbox"
                            defaultChecked={tree.isIllegalFelling}
                          ></input>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {tree.notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{from}</span> to{" "}
                    <span className="font-medium">
                      {to > TreeCount.data! ? TreeCount.data : to}
                    </span>{" "}
                    of <span className="font-medium">{TreeCount?.data}</span>{" "}
                    results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <button
                    disabled={from - itemsPerPage <= 0}
                    onClick={() => setPage((page) => page - 1)}
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </button>
                  <button
                    disabled={to + itemsPerPage > TreeCount.data!}
                    onClick={() => setPage((page) => page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
}
