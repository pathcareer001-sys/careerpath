export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h1>

      {description && (
        <p className="text-slate-600 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}
