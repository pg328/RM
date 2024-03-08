"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AgeInput } from "~/app/_components/AgeInput";

import { api } from "~/trpc/react";

export default function CreateForest() {
  const router = useRouter();
  const [forest, setForest] = useState("");
  const [errors, setErrors] = useState({});

  const createForest = api.forest.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setForest("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createForest.mutate({ name: forest });
      }}
      onError={(e) => {
        e.preventDefault();
        console.error(e);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="New Forest"
        value={forest}
        onChange={(e) => setForest(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createForest.isLoading}
      >
        {createForest.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
