export default function Card({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <div className="rounded-md bg-black/25 px-4 py-5 sm:px-6">
      <h2 className="py-5 text-2xl font-bold leading-7 text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
        {heading}
      </h2>
      <div className="flex space-x-3">
        <div className="flex flex-shrink-0 self-center">{children}</div>
      </div>
    </div>
  );
}
