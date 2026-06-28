interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div>
      <h2 className="text-xl font-medium">{title}</h2>

      {description && <p className="text-secondary-text mt-1">{description}</p>}
    </div>
  );
}
