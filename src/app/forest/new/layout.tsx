import Card from "~/app/_components/Card";

export default async function CrudShowcase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Card heading="New Forest">{children}</Card>
    </main>
  );
}
