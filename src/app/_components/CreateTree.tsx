"use client";

import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

import { api } from "~/trpc/react";
import { treeSchema } from "~/trpc/shared";
import { TreeKindDropdown } from "./TreeKindDropdown";
import { ForestDropdown } from "./ForestDropdown";
import { BatchDropdown } from "./BatchDropdown";
import { AgeInput } from "./AgeInput";
import { NotesInput } from "./NotesInput";
import { IllegalFellingCheckbox } from "./IllegalFellingCheckbox";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type TreeKind = {
  treeKindId: string;
  batchId: string;
  forestId: string;
  age: string;
  notes?: string;
  isIllegalFelling?: boolean;
};

type ActionType =
  | { type: "RESET" }
  | {
      type: "UPDATE_TREE";
      payload: Partial<TreeKind>;
    };

type CreateTreeProps = {
  treeKinds: { id: number; name: string }[];
  batches: { id: number }[];
  forests: { id: number; name: string }[];
};

export const CreateTree: React.FC<CreateTreeProps> = ({
  treeKinds,
  forests,
  batches,
}) => {
  const router = useRouter();

  const initialTreeState: TreeKind = {
    treeKindId: "1",
    batchId: `${batches?.[0]?.id}` ?? "1",
    forestId: "1",
    age: "0",
    notes: "",
    isIllegalFelling: false,
  };

  const [errors, setErrors] = useState<any>({ age: "" });
  const treeReducer = (state: TreeKind, action: ActionType) => {
    if (action.type === "UPDATE_TREE") {
      return { ...state, ...action.payload };
    }
    if (action.type === "RESET") {
      setErrors({ age: "" });
      return initialTreeState;
    }
    throw Error("Something went wrong! Contact the devs? (Unknown Action)");
  };

  const [treeState, dispatch] = useReducer(treeReducer, initialTreeState);

  const updateTree = (treeObject: Partial<TreeKind>) => {
    dispatch({
      type: "UPDATE_TREE",
      payload: treeObject,
    });
  };

  const { treeKindId, batchId, forestId, age, notes, isIllegalFelling } =
    treeState;

  const createTree = api.tree.create.useMutation({
    onSuccess: () => {
      router.refresh();
      dispatch({ type: "RESET" });
    },
    onError: (e) => {
      console.error(e);
      console.log("Simulate Caching");
      router.refresh();
    },
    networkMode: "offlineFirst",
    retry: 0,
  });

  return (
    <div>
      <div className="isolate rounded-md bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            New Tree!
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Time to add a new tree! Fill in the options and hit submit!
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const result = treeSchema.safeParse(treeState);
            if (result.success) {
              createTree.mutate(result.data);
            } else {
              setErrors(result.error.formErrors.fieldErrors);
              console.error(result.error.formErrors.fieldErrors);
            }
          }}
          onError={(e) => {
            e.preventDefault();
            console.error(e);
          }}
          className="flex flex-col gap-2"
        >
          <TreeKindDropdown
            update={updateTree}
            treeKinds={treeKinds}
            treeKindId={treeKindId}
          />
          <BatchDropdown
            update={updateTree}
            batches={batches}
            batchId={batchId}
          />
          <ForestDropdown
            update={updateTree}
            forests={forests}
            forestId={forestId}
          />
          <AgeInput age={age} update={updateTree} errorMessage={errors.age} />
          <NotesInput notes={notes ?? ""} update={updateTree} />
          <IllegalFellingCheckbox
            update={updateTree}
            isIllegalFelling={!!isIllegalFelling}
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={createTree.isLoading}
          >
            {createTree.isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
