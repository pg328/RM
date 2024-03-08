"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreateTreeKind() {
  const router = useRouter();
  const [kind, setKind] = useState("");
  const [errors, setErrors] = useState({});

  const createTreeKind = api.treeKind.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setKind("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTreeKind.mutate({ name: kind });
      }}
      onError={(e) => {
        e.preventDefault();
        console.error(e);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="New Tree Species"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTreeKind.isLoading}
      >
        {createTreeKind.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
