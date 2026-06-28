export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-[24px] font-semibold tracking-tight text-heading">{title}</h1>
      {description && (
        <p className="mt-1.5 text-sm text-secondary-text leading-relaxed">{description}</p>
      )}
    </div>
  );
}
