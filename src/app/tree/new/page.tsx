import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreateTree } from "~/app/_components/CreateTree";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const latestRecordedTree = await api.tree.getLatest.query();

  return <CrudShowcase />;
}

async function CrudShowcase() {
  const latestRecordedTree = await api.tree.getLatest.query();
  const treeKinds = await api.treeKind.getTreeKinds.query();
  const forests = await api.forest.getForests.query();
  const batches = await api.batch.getBatches.query();

  return (
    <div className="w-full">
      <CreateTree treeKinds={treeKinds} forests={forests} batches={batches} />
    </div>
  );
}
