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
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createBatch.isLoading}
      >
        {createBatch.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
