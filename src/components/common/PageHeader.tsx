export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-[22px] font-medium text-heading">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-secondary-text">{description}</p>
      )}
    </div>
  );
}
