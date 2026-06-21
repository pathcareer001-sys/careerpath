export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">{children}</div>
  );
}
