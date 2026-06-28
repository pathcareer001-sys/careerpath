interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-secondary-text mt-1 leading-relaxed">{description}</p>}
    </div>
  );
}
