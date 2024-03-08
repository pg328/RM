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

const treeReducer = (state: TreeKind, action: ActionType) => {
  if (action.type === "UPDATE_TREE") {
    return { ...state, ...action.payload };
  }
  if (action.type === "RESET") {
    return initialTreeState;
  }
  throw Error("Something went wrong! Contact the devs? (Unknown Action)");
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
  const [treeState, dispatch] = useReducer(treeReducer, initialTreeState);
  const [errors, setErrors] = useState({});

  const updateTree = (treeObject: Partial<TreeKind>) => {
    dispatch({
      type: "UPDATE_TREE",
      payload: treeObject,
    });
  };

  const initialTreeState: TreeKind = {
    treeKindId: "1",
    batchId: `${batches?.[0]?.id}` ?? "1",
    forestId: "1",
    age: "0",
    notes: "",
    isIllegalFelling: false,
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
      <BatchDropdown update={updateTree} batches={batches} batchId={batchId} />
      <ForestDropdown
        update={updateTree}
        forests={forests}
        forestId={forestId}
      />
      <AgeInput age={age} update={updateTree} />
      <NotesInput notes={notes ?? ""} update={updateTree} />
      <IllegalFellingCheckbox
        update={updateTree}
        isIllegalFelling={!!isIllegalFelling}
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTree.isLoading}
      >
        {createTree.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
